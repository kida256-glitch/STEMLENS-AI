import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { AnalysisRecord, QuizResult, UserStatistics } from '@/types';

// Save analysis record
export async function saveAnalysis(
  userId: string,
  imageFile: File,
  analysisData: Omit<AnalysisRecord, 'id' | 'userId' | 'imageUrl' | 'createdAt'>
): Promise<string> {
  try {
    // Upload image to Firebase Storage
    const imageRef = ref(storage, `analyses/${userId}/${Date.now()}_${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Save analysis to Firestore
    const analysisRef = await addDoc(collection(db, 'analyses'), {
      userId,
      imageUrl,
      objectRecognition: analysisData.objectRecognition,
      lessonContent: analysisData.lessonContent,
      quizQuestions: analysisData.quizQuestions,
      createdAt: Timestamp.now(),
    });

    return analysisRef.id;
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw new Error('Failed to save analysis');
  }
}

// Update quiz result
export async function saveQuizResult(
  analysisId: string,
  quizResult: QuizResult
): Promise<void> {
  try {
    const analysisRef = doc(db, 'analyses', analysisId);
    await updateDoc(analysisRef, {
      quizResult: {
        ...quizResult,
        completedAt: Timestamp.now(),
      },
    });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw new Error('Failed to save quiz result');
  }
}

// Get user's analyses
export async function getUserAnalyses(
  userId: string,
  limitCount: number = 10
): Promise<AnalysisRecord[]> {
  try {
    const q = query(
      collection(db, 'analyses'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        quizResult: data.quizResult
          ? {
              ...data.quizResult,
              completedAt: data.quizResult.completedAt.toDate(),
            }
          : undefined,
      } as AnalysisRecord;
    });
  } catch (error) {
    console.error('Error getting user analyses:', error);
    return [];
  }
}

// Get single analysis
export async function getAnalysis(analysisId: string): Promise<AnalysisRecord | null> {
  try {
    const docRef = doc(db, 'analyses', analysisId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        quizResult: data.quizResult
          ? {
              ...data.quizResult,
              completedAt: data.quizResult.completedAt.toDate(),
            }
          : undefined,
      } as AnalysisRecord;
    }

    return null;
  } catch (error) {
    console.error('Error getting analysis:', error);
    return null;
  }
}

// Get user statistics
export async function getUserStatistics(userId: string): Promise<UserStatistics> {
  try {
    const analyses = await getUserAnalyses(userId, 100);

    const totalAnalyses = analyses.length;
    const completedQuizzes = analyses.filter((a) => a.quizResult);
    const totalQuizzes = completedQuizzes.length;
    
    const averageScore =
      totalQuizzes > 0
        ? completedQuizzes.reduce((sum, a) => sum + (a.quizResult!.score / a.quizResult!.totalQuestions) * 100, 0) / totalQuizzes
        : 0;

    return {
      totalAnalyses,
      totalQuizzes,
      averageScore: Math.round(averageScore),
      recentAnalyses: analyses.slice(0, 5),
    };
  } catch (error) {
    console.error('Error getting user statistics:', error);
    return {
      totalAnalyses: 0,
      totalQuizzes: 0,
      averageScore: 0,
      recentAnalyses: [],
    };
  }
}
