import { useState } from "react";

export type ActionProps = {
    onExecute: (input?: any)=>Promise<any>,
    onSucceed: (result : any)=>void,
    onFailure: (error : any)=>void
}

export type ActionResult<T> = {
    isExecuting: boolean,
    result?: T,
    error?: any
    execute: (input?: any)=>void,
}
export default function useAsyncAction<T>(config: ActionProps) : ActionResult<T> {

    const [isExecuting, setIsExecuting] = useState<boolean>(true)
    const [error, setError] = useState<any>();
    const [result, setResult] = useState<any>();

    const handleExecute = (input?: any) => {
        setIsExecuting(true)
        setError(undefined)
        setResult(undefined)

        config.onExecute(input)
        .then((result: any)=>{
            setResult(result)
            if(config.onSucceed) config.onSucceed(result)
        })
        .catch((error:any)=>{
            setError(error);
            if(config.onFailure) config.onFailure(error)
        })
        .finally(()=>setIsExecuting(false))
    }

    return {
        isExecuting,
        result,
        error,
        execute: handleExecute
    }

}