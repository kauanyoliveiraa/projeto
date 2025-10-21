//npm install react-hook-form
//npm install axios
//npm install -g json-server
//npm install json-server

//comandos de inicializacao
//npm run dev
//npx json-server --watch db.json --port 3001

import { useState, useEffect } from 'react'
import api from 'axios'

const Generico = () => {


   

    //sao as variaveis que pagam os valores dos inputs
    const [vemail,setEmail] = useState('')
    const [vcrn,setcrn] = useState('')
    const [vSexo,setsexo] = useState('')
    const [vnome,setNome] = useState('')
    const [vTel,setTel] = useState('')
   const [vData,setData] = useState('')

   //inicio da busca de dados
   const [vproduto, setProduto] = useState([]);



    useEffect(()=>{
        api.get('http://localhost:3001/produto')
        .then((res)=>{
            setProduto(res.data)
            console.log(res.data)
        
        }
    )
    .catch(err=> console.error("Error ao buscar os Dados", err));


    },[]);

    //fim da busca de dados
    

    //funçao que submete os dados para a url http://localhost:3001/produto que guarda os dados no server 
    //post significa: input de dados (cadastrar os dados)
    const handleSubmit = async () => {
        try{
            const response = await api.post("http://localhost:3001/produto",
                {nome: vnome, CRN: vcrn, sexo: vSexo, telefone: vTel,  Data: vData, Email: vemail})
                console.log(response.data)
        }catch(error){
            console.log(error)
        }        
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`http://localhost:3001/produto/${id}`);
            // Atualiza a lista após deletar
            const res = await api.get("http://localhost:3001/produto");
            setProduto(res.data);
        } catch (error) {
            console.log("Erro ao deletar produto", error);
        }
    };


    return(
    <>     
           <div className='app-container'>
                <div className='main-content'>
                    Cadastro de Nutricionistas
                </div>
                 
                 <form>
                    <div className='form-group'>
                        <label>Nome Completo</label>
                        <input type="text" placeholder="Nome do Nutricionista" required onChange={e => setNome(e.target.value)}  />
                    </div>
                    <div className='form-group'>
                        <label>Data de Nascimento</label>
                        <input type="date" placeholder="Ano De Nascimento" required onChange={e => setData(e.target.value)}  />
                    </div>
                    <div className='form-group'>   
                        <label>CRN</label>
                        <input type="text" placeholder="CRN" onChange={e => setcrn(e.target.value)} />
                    </div>
                    <div className='form-group'>

                         <label>Sexo</label>
                        <input type="text" placeholder="sexo" onChange={e => setsexo(e.target.value)} />
                    
                     </div>
                
                    <div className='form-group'>
                        <label>Email Profissional</label>
                        <input type="text" placeholder="email profissional" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label>Telefone</label>
                        <input type="text" placeholder="Numero de celular" onChange={e => setTel(e.target.value)} />
                    </div>
                   
                    




                    <div className='form-group'>
                        <button onClick={handleSubmit}>Cadastro </button>
                    </div>

                 </form>
                
                 <div className='main-content'>
                    Cadastro de Nutricionistas
                </div>

                <ul>
               {vproduto.map(prod =>(
                  <li key={prod.id}> {prod.nome} - {prod.preco}
                    <br/>
                    <div>
                        <button>Editar</button>
                        <button onClick={()=> handleDelete(prod.id)}>Deletar</button>
                    </div>
                 
                 
                 
                 
                  </li>
                    

                    


               ))}
           
 
             </ul>
                
            
            </div>
            
    </>    
    )
}
export default Generico