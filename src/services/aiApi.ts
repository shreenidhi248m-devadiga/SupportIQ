import api from './api';
import { AIAnalysis, ApiResponse } from '../types';

export interface VoiceAnalysisResponse extends AIAnalysis {
  transcribedText: string;
  audioFileName: string;
}

export interface ImageAnalysisResponse extends AIAnalysis {
  extractedText: string;
  imageFileName: string;
}

export interface DocumentAnalysisResponse extends AIAnalysis {
  extractedText: string;
  docFileName: string;
}

export const aiApi = {
  analyzeText: async (text: string, subject?: string): Promise<AIAnalysis> => {
    const response = await api.post<ApiResponse<AIAnalysis>>('/ai/analyze-text', { text, subject });
    return response.data.data;
  },

  analyzeVoice: async (formData: FormData): Promise<VoiceAnalysisResponse> => {
    const response = await api.post<ApiResponse<VoiceAnalysisResponse>>('/ai/analyze-voice', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  analyzeImage: async (formData: FormData): Promise<ImageAnalysisResponse> => {
    const response = await api.post<ApiResponse<ImageAnalysisResponse>>('/ai/analyze-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  analyzeDocument: async (formData: FormData): Promise<DocumentAnalysisResponse> => {
    const response = await api.post<ApiResponse<DocumentAnalysisResponse>>('/ai/analyze-document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },
};

export default aiApi;