import '../Formulario/style1.css'

function Formulario(){

    return(
      
        <div className='app-container'>
            <div className='main-content'>
                Formulario
            </div>
            
            <form>
                <div className='form-group'>
                    <label for="text">Texto:</label>
                    <input type="text" id="text" name="text" placeholder='Digite seu nome' required />
                </div>
                <div className='form-group'>
                    <label for="password">Senha:</label>
                    <input type="password" id="password" name="password" placeholder='Digite sua senha' required />
                </div>
               
                <div className='form-group'>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder='Digite seu email' />
                </div>

                <div className='form-group'>
                    <label for="number">Número:</label>
                    <input type="number" id="number" name="number" />
                </div>

                <div className='form-group'>
                    <label for="tel">Telefone:</label>
                    <input type="tel" id="tel" name="tel" />
                </div>

                <div className='form-group'>
                    <label for="url">URL:</label>
                    <input type="url" id="url" name="url" />
                </div>

                <div className='form-group'>
                    <label for="search">Pesquisar:</label>
                    <input type="search" id="search" name="search" />
                </div>
                <div className='form-group'>
                    <label for="date">Data:</label>
                    <input type="date" id="date" name="date" />
                </div>
                <div className='form-group'>
                    <label for="time">Tempo:</label>
                    <input type="time" id="time" name="time" />
                </div>
                <div className='form-group'>
                    <label for="datetime-local">Data e Hora:</label>
                    <input type="datetime-local" id="datetime-local" name="datetime-local" />
                </div>

                <div className='form-group'>
                    <label for="month">Mês:</label>
                    <input type="month" id="month" name="month" />
                </div>

                <div className='form-group'>
                    <label for="week">Semana:</label>
                    <input type="week" id="week" name="week" />
                </div>

                <div className='form-group'>
                    <label for="color">Cor:</label>
                    <input type="color" id="color" name="color" />
                </div>

                <div className='form-group'>
                    <label for="range">Intervalo:</label>
                    <input type="range" id="range" name="range" />
                </div>

                <div className='form-group'>
                    <label for="file">Arquivo:</label>
                    <input type="file" id="file" name="file" />
                </div>

                <div className='form-group'>
                    <label for="checkbox">checkbox:</label>
                    <input type="checkbox" id="checkbox" name="checkbox" /> Opção 1 < br/>
                    <input type="checkbox" id="checkbox" name="checkbox" /> Opção 2 < br/>
                    <input type="checkbox" id="checkbox" name="checkbox" /> Opção 3 < br/>
                    <input type="checkbox" id="checkbox" name="checkbox" /> Opção 4 < br/>
                    <input type="checkbox" id="checkbox" name="checkbox" /> Opção 5 < br/>
                </div>
                
                <div className='form-group'>
                    <label for="radio1">Masculino:</label>
                    <input type="radio" id="radio1" name="radio" />
                    <label for="radio2">Feminino:</label>
                    <input type="radio" id="radio2" name="radio" />
                </div>
                                
                <div className='form-group'>
                    <label for="select">Select:</label>
                    <select id="select" name="select">
                        <option value="RJ">RJ</option>
                        <option value="SP">SP</option>
                        <option value="MG">MG</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label for="textarea">Textarea:</label>
                    <textarea id="textarea" name="textarea"></textarea>
                </div>
               
                <div className='form-group'>
                        <button type="submit">Enviar</button>
                </div>
            </form>
        </div>

    );
}
export default Formulario