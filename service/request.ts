import axiosInstance from './axios'

const CARBONETES_WRAPPER_API = 'https://api.carbonetes.com';

const request = {
  analyzeImage: (data: any) => axiosInstance.post(
    CARBONETES_WRAPPER_API + '/api/v1/analysis',
    data
  ),
  getAnalysisResult: (data: any) => axiosInstance.post(
    CARBONETES_WRAPPER_API + '/api/v1/analysis/get-result',
    data
  ),
}

export default request;