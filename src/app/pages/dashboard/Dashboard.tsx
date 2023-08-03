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

    const handleToggleComplete = useCallback((id: number) => {
        const tarefasToUpdate = lista.find((tarefa) => tarefa.id === id);
        if (!tarefasToUpdate) return;

        TarefaService.updateById(id, {
            ...tarefasToUpdate,
            isCompleted: !tarefasToUpdate.isCompleted
        })
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista(oldLista => {
                        return oldLista.map(oldListItem => { 
                            if (oldListItem.id === id) return result;
                            
                            return oldListItem;
                        })
                    })
                }
            })
        
    }, [lista])

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
                                onChange={() => handleToggleComplete(ListItem.id)}
                            />
                            {ListItem.title}
                        </li>
                    )
                })}
            </ul>
            
        </div>
    )
}