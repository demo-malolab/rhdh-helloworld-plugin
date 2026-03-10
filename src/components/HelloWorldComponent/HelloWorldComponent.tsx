import { Page, Header, Content } from '@backstage/core-components';
import { useEffect, useState } from 'react';
import { useApi, fetchApiRef } from '@backstage/core-plugin-api';

export const HelloWorldComponent = () => {
    const fetchApi = useApi(fetchApiRef);
    const [number, setNumber] = useState<number | null>(null);
    useEffect(() => {
        fetchApi.fetch('/api/proxy/random-number-api/api/v1.0/random?min=1&max=100&count=1')
            .then(res => res.json())
            .then(data => setNumber(data[0]))
            .catch(err => console.error(err));
    }, [fetchApi]);
    return (
        <Page themeId="tool">
            <Header title="Ce plugin prouve l'integration à un micro-service externe" />
            <Content>
                <p>Voici un numéro de 1 à 100 récupérer d'un micro-service externe:</p>
                {number !== null ? <p>{number}</p> : <p>Un instant...</p>}
            </Content>
        </Page>
    );
}
