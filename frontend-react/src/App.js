import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import './App.css';
import api from './services/api';
import 'regenerator-runtime/runtime';
import List from './components/List';
import image from './assets/save_the_date.png';





export default function App(){
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    api.get('/wedding').then(res =>{
      setGuests(res.data);
      console.log(guests);
    });
  }, [])


  

	async function HandleAddGuest(){
    const name = document.getElementById('inputName').value;
    const family = document.getElementById('inputFamily').value;

    if(name == ""){
      return  alert("Valor 'nome' incompleto!");
    }

    const response = await api.post('/wedding', {
      name,
      age: 21,
      family 
    });

    const guest = response.data;

    setGuests([...guests, guest]);

    document.getElementById('inputName').value = "";
    document.getElementById('inputFamily').value = "";

		
  }
  
  async function HandleRemoveGuest(id){
    await api.delete(`/wedding/${id}`);

    setGuests(guests.filter(guest => guest.id !== id));

  }

  

  


	return (
    <>
      <Header title="Lista de Convidados"/>

      <List>
        {guests.map(guest => (
                <li className="guestList" key={guest.id}>
                  {`${guest.name} ${guest.family}`}
                  <button id="removeBtn" onClick={() => HandleRemoveGuest(guest.id)}>
                    Remover
                  </button>
                </li>
              ))}
      </List>
      
    <form action="/wedding" className="guestData">

    <div className="campoNome">
      <p>Nome:</p>
    <input id="inputName" type="text" placeholder="Digite o nome completo do convidado"/>
    </div>

    <div className="campoFamilia">
      <p>Familia:</p>
    <input type="text" id="inputFamily" placeholder="Digite o nome da sua familia"/>
    </div> 

    <button id="btn" type="button" onClick={HandleAddGuest}>Adicionar Convidado</button>
    
    </form>        
  
    </>

   

  )

}