import './tarefa.css'
import Trash from './trash_icon.png'

const Tarefa = (props) => {
    return <div className='task'>
        <div>
        <input className='task-checkbox'
        type="checkbox"
        id='tarefa'
        checked={props.concluido === "S" ? true : false}
        onChange={(e)=>
            {props.onClickConcluido(props.id_tarefa,
                                    props.descricao,
                                    e.target.checked)}}
        />
        {props.concluido === 'S' ? <span className='task-done'>{props.descricao}</span>
            :
            <span>{props.descricao}</span>
        }

        </div>

    <img onClick={(e)=>props.onClickDelete(props.id_tarefa)} className='icon-red' src={Trash} alt='icone de lixeira'/>
    </div>
}

export default Tarefa;