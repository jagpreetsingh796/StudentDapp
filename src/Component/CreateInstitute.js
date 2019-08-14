import React from "react"
import firebase from './Firestore'
import { ethers } from 'ethers';
import Loader from 'react-loader-spinner'
let addr

class CreateInstitute extends React.Component
{
    constructor()
    {
        super()
        this.state={
            
            Name:"",
            Name1:"",
            Id:"",
            owner:"",
            loading1: false,
            loading2:false,
           
           
        }
         this.handlechange=this.handlechange.bind(this)
        this.handlesubmit=this.handlesubmit.bind(this)
        this.handlesubmit1=this.handlesubmit1.bind(this)
    }
    handlechange=(e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        },console.log(this.state.Name1))
    }
    handlesubmit= async(e)=>
    {
        e.preventDefault();
        this.setState({ loading1: true });
        const db = firebase.firestore();
        let ethereum = window.ethereum;
       addr=await ethereum.enable()
        this.setState({ owner: addr });
        let  provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        console.log("the owner is",this.state.owner)
        const signer = provider.getSigner();
        let abi=[
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "name": "_student",
                        "type": "address"
                    }
                ],
                "name": "getcheckFeesbyId",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "name": "_student",
                        "type": "address"
                    },
                    {
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "name": "getPayFeesbyId",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_id",
                        "type": "uint256"
                    },
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "studentid",
                        "type": "uint256"
                    },
                    {
                        "name": "_student",
                        "type": "address"
                    },
                    {
                        "name": "_cours",
                        "type": "string"
                    }
                ],
                "name": "getRegisterbyId",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "NewStudent",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "_database",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getid",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "getstatus",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
        let address="0x67eda3495b569af4b6184a0fa3d94d98455ee4f8"
        let contract = new ethers.Contract(address, abi, signer);
        console.log(contract)
    
        let tx1= await contract.NewStudent(addr.toString())

        let id=await contract.getid()
      
        console.log("the id is",id.toString())
        const userRef = db.collection("institute").add({
            id: id.toString(),
            Name:this.state.Name,
            owner:addr
            
            
          });
        this.setState({ Name:"",loading1: false });

    }
    handlesubmit1=async(e)=>
    {
        e.preventDefault()
            this.setState({ loading2: true });
            let ethereum = window.ethereum;
           let addr1=await ethereum.enable()
           console.log("the address is",addr1)
            const db = firebase.firestore();
            const userRef1 = await db.collection("institute").where('Name' , '==' ,this.state.Name1).where('owner','==',addr1).get()
            let Tokenid
            userRef1.docs.forEach(async (Ele) => {
                console.log("the id is", Ele.data().id)
                console.log("the owner address is", Ele.data().owner)

                Tokenid=Ele.data().id
            })
            this.setState({
                Id:Tokenid,
                Name1:"",
                
                loading2:false
            })
    }
    render()
    {
        const loading1=this.state.loading1
        const loading2=this.state.loading2
        return(
            <div>
             <form onSubmit={this.handlesubmit}>  
            Enter Institute Name
            <input  type="text"  name="Name"  label="Name" onChange={this.handlechange} value={this.state.Name}/>
            <button type="submit" disabled={loading1}>
                    {this.state.loading1 ===true  ?  <Loader
         type="Puff"
         color="white"
         height="30"
         width="30"
      />: ""}
                        
                        Create</button>
            </form> 
            <form onSubmit={this.handlesubmit1} >
                    <h4>Check your Institute ID</h4>
                    Enter Name
                    <input type="text" name="Name1" onChange={this.handlechange} value={this.state.Name1} />
                    <br/>
                    <button type="submit" disabled={loading2} >
                    {this.state.loading2 ===true  ?  <Loader
         type="Puff"
         color="white"
         height="30"
         width="30"
      />: ""}submit</button>
                </form>
                
                <br/>
                
                {this.state.Id !== "" ? <h3 style={{textAlign: 'center'}}>The Tokenid is {this.state.Id}</h3> : ""}
            </div>
        )

    }
}
export default CreateInstitute