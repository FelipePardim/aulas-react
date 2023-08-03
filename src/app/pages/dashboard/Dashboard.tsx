import { useCallback, useEffect, useState } from "react"
import { ITarefa, TarefaService } from "../../shared/services/api/tarefas/TarefasService";
import { ApiException } from "../../shared/services/api/ApiException";

export const Dashboard = () => {

    const [lista, setLista] = useState<ITarefa[]>([]);

    useEffect(() => {
        TarefaService.getAll()
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista(result);
                }
            })
    }, []);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0 )return;

            const value = e.currentTarget.value;
            e.currentTarget.value = '';
            
            if (lista.some((ListItem) => ListItem.title === value)) return;

            TarefaService.create({
                title: value,
                isCompleted: false
            }).then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista((oldLista) => {
                        return [ ...oldLista, result ];
                    });
                }
            })
        }
    }, [lista]);

    return (
        <div>
            <p>Lista</p>

            <input onKeyDown={handleInputKeyDown}/>

            <p>{lista.filter((listItem) => listItem.isCompleted).length}</p>

            <ul>
                {lista.map((ListItem) => {
                    return (
                        <li key={ListItem.id}>
                            <input 
                                type="checkbox"
                                checked={ListItem.isCompleted}
                                onChange={() => {
                                    setLista(oldLista => {
                                        return oldLista.map(oldListItem => {
                                            const newIsSelected = oldListItem.title === ListItem.title? !oldListItem.isCompleted : oldListItem.isCompleted
                                            return {
                                                ...oldListItem,
                                                isSelected: newIsSelected
                                            }
                                        })
                                    })
                                }}
                            />
                            {ListItem.title}
                        </li>
                    )
                })}
            </ul>
            
        </div>
    )
}