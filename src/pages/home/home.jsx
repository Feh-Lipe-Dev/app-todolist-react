import './home.css';
import Tarefa from '../../components/tarefa/tarefa';
import { useEffect, useState } from 'react';

const Home = () => {
    const [tarefas, setTarefas] = useState([]);
    const [descricao, setDescricao] = useState('');

    const ListarTarefas = () => {
        fetch('http://localhost:3001/tarefas')
        .then((response) => {
            response.json().then((json) => {
                setTarefas(json);
            })
        })
    }

    const AddTarefa = () => {
        const json = {
            descricao: descricao,
            concluido: 'N'
        };
        fetch('http://localhost:3001/tarefas', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => {
                ListarTarefas();
                setDescricao('');
            })
            .catch(error => {
                console.log(error);
            })
        }

    const DeleteTarefa = (id_tarefa) => {
        fetch(`http://localhost:3001/tarefas/${id_tarefa}`, {
            method: 'DELETE'
            })
        .then((response) => {
                ListarTarefas();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const TarefaConcluida = (id_tarefa, descricao, concluido) => {
        const json = {
            descricao: descricao,
            concluido: concluido === true ? 'S' : 'N'
        };
        fetch(`http://localhost:3001/tarefas/${id_tarefa}`, {
            method: 'PUT',
            body: JSON.stringify(json),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => {
                ListarTarefas();
            })
            .catch(error => {
                console.log(error);
        })
    }

        useEffect(() => {
            ListarTarefas();
        }, [])

    return <>
    <div className="container-tasks">
        <span className='title'>
            Minha Lista de Tarefas
            <button onClick={ListarTarefas} className='btn-refresh icon-green'>
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="blue"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>
            </button>
        </span>

    <div className='form-task'>
        <input className='input-task'
        type="text"
        placeholder='Descreva a tarefa'
        value={descricao}
        onChange={(e) => {
            setDescricao(e.target.value);
        }}
        />
        <button onClick={AddTarefa} className='btn-task'>Inserir tarefa</button>
    </div>
        
        <div>
            {
                tarefas.map((tarefa) => {
                    return <Tarefa  key={tarefa.id_tarefa}
                                    id_tarefa={tarefa.id_tarefa}
                                    descricao={tarefa.descricao}
                                    concluido={tarefa.concluido}
                                    onClickDelete={DeleteTarefa}
                                    onClickConcluido={TarefaConcluida}
                    />
                })
            }
        </div>
    </div>

    <div className='made-by'>
        Feito por <a href="https://github.com/Feh-Lipe-Dev">Feh-Lipe-Dev</a>
    </div>
    </>    
}

export default Home;