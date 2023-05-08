class EmptyRequestResult {
    errorCode?: string;
    errorMessages?: string[];
    statusCode: number;
  }
  
  class RequestResult<T> extends EmptyRequestResult {
    data?: T;
  }
  
  export { EmptyRequestResult, RequestResult };