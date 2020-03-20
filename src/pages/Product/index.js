import React, { Component } from 'react';
import {MdDelete} from 'react-icons/md'
import Menu from '../../components/Menu';
import api from '../../services/api';
import { Container, Form, Panel, FormImagens } from './style';

class MainSystem extends Component {
  state = {
    title: '',
    description:'',
    price: Number,
    stock:Number,
    type:'',
    images: [],
    faq:[],
    question:'',
    answer:''
  };

    async componentDidMount(){
      const {id} =this.props.match.params;
      if(id){
        const response = await api.get(`/products/${id}`)
        const {title,description,price,stock,type,images,faq} = response.data;



        this.setState({
          title,description,price,stock,type,images,faq
        })

      }

    }

   handleSaveProduct =async ()=>{
    const {title,description,price,stock,type,images,faq} =this.state;
    const {id} =this.props.match.params;


    if(id){
      await api.put(`/products/${id}`,{
        title,
        description,
        price,
        stock,
        type,
        images,
        faq
      });

    }else{
      await api.post('/products',{
        title,
        description,
        price,
        stock,
        type,
        images,
        faq
      });
    }


    this.setState({title:'',description:'',price:0,stock:0,type:'',images:[],faq:[]})

  }
  handleAddFaq=()=>{
    const {faq,question,answer} =this.state;
    const id=faq.length+1;
    this.setState({faq:[...faq,{
        id,
        question,
        answer
      }],
      question:'',
      answer:''
    })

  }

  handleAddTitle = e=>{
    this.setState({title:e.target.value})
  }
  handleAddDescription = e=>{
    this.setState({description:e.target.value})
  }
  handleAddPrice = e=>{
    this.setState({price:e.target.value})
  }
  handleAddType = e=>{
    this.setState({type:e.target.value})
  }
  handleAddStock = e=>{
    this.setState({stock:e.target.value})
  }
  handleAddAnswer = e=>{
    this.setState({answer:e.target.value})
  }
  handleAddQuestion = e=>{
    this.setState({question:e.target.value})
  }
  handleAddImg=e=>{
    // const file = e.target.files;
    // console.log(file);
    this.setState({image:e.target.value})

  }


  render() {

    const {title,description,price,stock,type,images,faq,question,answer} =this.state;
    return (
      <Container>
        <Menu />
        <Panel>
          <div className="content">
            <Form>

              <input type="text"
                onChange={this.handleAddTitle}
                placeholder="Informe o titulo de produto"
                defaultValue={title}/>
              <input
                type="text"
                onChange={this.handleAddType}
                placeholder="Informe a plataforma"
                defaultValue={type}/>
              <input
                type="Number"
                onChange={this.handleAddStock}
                placeholder="Quantidade de estoque"
                defaultValue={stock}/>
              <input
                type="Number"
                onChange={this.handleAddPrice}
                placeholder="Valor Unitario"
                defaultValue={price}/>
              <textarea
                type="text"
                placeholder="Informe o Descrição de produto"
                defaultValue={description}
              />

                <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Pergunta</th>
                      <th>Resposta</th>
                      <th/>
                    </tr>
                  </thead>
                  <tbody>
                    {faq.map(f=>(
                      <tr key={f.id}>
                        <td>{f.question}</td>
                        <td>{f.answer}</td>
                        <td><MdDelete size={26} color="#22272a"/></td>
                      </tr>
                    ))}

                  </tbody>
                </table>
                </div>

                <div className="btns-add-faq">
                  <div className="faq">
                    <input
                      type="text"
                      placeholder="Pergunta"
                      onChange={this.handleAddQuestion}
                      value={question}
                    />
                    <input
                      type="text"
                      placeholder="Resposta"
                      onChange={this.handleAddAnswer}
                      value={answer}
                    />
                  </div>
                  <button type="button" onClick={this.handleAddFaq}>Add</button>
                </div>

            </Form>
            <FormImagens >
              <div className="carrousel">
                {images.map(i=>(
                  <img
                    key={i.id}
                    src={i.image}
                    alt={title}
                    id={i.id}
                    />
                  ))}

                </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th />

                    </tr>
                  </thead>
                  <tbody>
                    {images.map(img=>(
                      <tr>
                        <a href={`#${img.id}`}><td>{`Imagem${img.id}`}</td></a>
                        <td><td><MdDelete size={26}/></td></td>
                      </tr>
                    ))}

                  </tbody>
                </table>

                  {/* <input type="file" multiple onChangeCapture={this.handleAddImg}/> */}
                  <input type="text" onChange={this.handleAddImg}/>


              </div>
              <button type="button" onClick={this.handleSaveProduct}>Salvar</button>
            </FormImagens>

          </div>
        </Panel>
      </Container>
    );
  }
}

export default MainSystem;
