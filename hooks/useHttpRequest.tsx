import { useState } from "react";

interface UseHttpRequestProps {
    method: string;
    route: string;
    body?: any;
}

const useHttpRequest = () => {
    const [response, setResponse] = useState<any>();
    const [error, setError] = useState<any>();

    const invoke = async ({ method, route, body = {} }: UseHttpRequestProps) => {
        let response;
        let options: any = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            crossDomain: true,
        }

        if (method !== 'GET') {
            options = { ...options, body: JSON.stringify(body) }
        }

        try {
            const json = await fetch(window.location.origin + '/api' + route, options);
            response = await json.json();
        } catch (error) {
            setError(error);
            console.error(error);
        }
        setResponse(response);
        return response;
    }

    return {
        invoke,
        response,
        error
    }

}

export default useHttpRequest;