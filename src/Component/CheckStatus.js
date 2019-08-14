import React from "react"

import { ethers } from 'ethers';
import Loader from 'react-loader-spinner'

class CheckStatus extends React.Component
{
    constructor()
    {
        super()
        this.state={
            
           stuname:"",
           status:" ",
           loading:false
        }
        this.handlechange=this.handlechange.bind(this)
        //  this.handlesubmit=this.handlesubmit.bind(this)
    }
    handlechange = e =>
    {
        this.setState({
            [e.target.name]:e.target.value
        },console.log(this.state))
    }
    handlesubmit= async(e)=>{
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
        let sta= await contract. getstatus(this.state.stuname)
        if(sta===true)
        {
            this.setState({
                status:"paid"
            })
        }
        else
        {
            this.setState({
                status:"not paid"
            })
        }

        debugger
        this.setState({
            stuname:"",
            
           loading:false

        })
    }
    
    render()
    {
        const loading=this.state.loading
        return(
            <div>
                <form onSubmit={this.handlesubmit}>
                Enter student name
                    <input type="text" name="stuname" onChange={this.handlechange} value={this.state.stuname} />
                    <button type="submit" disabled={loading}>
                    {this.state.loading ===true  ?  <Loader
         type="Puff"
         color="white"
         height="25"
         width="25"
      />: ""}Status</button>


                </form>

                <br/>
                
                {this.state.status=="paid"? <h3 >The Fees is paid</h3> :""}
                {this.state.status=="not paid"? <h3 >The Fees is not paid</h3> :""}
               
               

            </div>
        )
    }
}
export default CheckStatus