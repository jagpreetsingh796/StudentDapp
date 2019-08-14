import React from "react"

import { ethers } from 'ethers';
import Loader from 'react-loader-spinner'

class PayFees extends React.Component
{
    constructor()
    {
        super()
        this.state={
            Id:"",
          
           stuaddress:"",
           stuname:"",
           Amount:"",
          
           loading:false
            
        }
        this.handlechange=this.handlechange.bind(this)
         this.handlesubmit=this.handlesubmit.bind(this)
    }
    handlechange = e =>
    {
        this.setState({
            [e.target.name]:e.target.value
        },console.log(this.state.Amount))
    }
    handlesubmit= async(e)=>
    {
        e.preventDefault();
        this.setState({ loading: true });
        let ethereum = window.ethereum;
        let addr=await ethereum.enable()
        let  provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
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
        
        let tx1= await contract.getPayFeesbyId(this.state.Id,this.state.stuaddress,this.state.stuname,{value:ethers.utils.parseEther(this.state.Amount)})
        this.setState({
            Id:"",
          
           stuaddress:"",
           stuname:"",
           Amount:"",
            loading:false

        })
      
    }
    render()
    {
        const loading=this.state.loading
        return(
            <div>
                <h4>The fees is 0.0000001</h4>
                <form onSubmit={this.handlesubmit}>

                Enter Id
                    <input type="text" name="Id" onChange={this.handlechange} value={this.state.Id}/>
                   
                    Enter student name
                    <input type="text" name="stuname" onChange={this.handlechange} value={this.state.stuname} />
                    Enter student address
                    <input type="text" name="stuaddress" onChange={this.handlechange} value={this.state.stuaddress} />
                    
                    Enter Amount
                    <input type="text" name="Amount" onChange={this.handlechange} value={this.state.Amount} />
                    
                    <button type="submit" disabled={loading}>
                    {this.state.loading ===true  ?  <Loader
         type="Puff"
         color="white"
         height="25"
         width="25"
      />: ""}PayFees</button>

                </form>
            </div>
        )
    }
}
export default PayFees