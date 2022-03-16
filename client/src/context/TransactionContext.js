import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/Constants'


export const TransactionContext = createContext()

// for clients with metamask plugin enabled
// destructure metamask ethereum object from window
const { ethereum } = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    // instance of sc
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    return transactionContract
}

export const TransactionProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [currentAccount, setCurrentAccount] = useState('') 
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''})
    
    useEffect(() => {
        checkIfMetamaskEnabled()
    }, [])

    const changeHandler = (event, name) => { 
        setFormData( (prevState) => ({...prevState, [name]: event.target.value }))
    }

    const checkIfMetamaskEnabled = async () => {
        // check for metamask plugin
        if (!ethereum) return alert("You must install the metamask plugin in order to proceed.")
    
       try {
            // request an object that specifies eth_accounts property
            const accounts = await ethereum.request({ method: 'eth_accounts' })
        
            if (accounts.length) {
                setCurrentAccount(accounts[0])
                // get all transactions
        } else {
            console.log('No accounts found')
            }
           
       } catch (error) {
        console.log(error)
        throw new Error('No ethereum account in wallet object.')
       }
    }

    // connect metamask wallet
    const connectWallet = async () => {
        // check for metamask plugin
        if (!ethereum) return alert("You must install the metamask plugin in order to proceed.")

        try {            
            // request an object that returns array of all eth accounts
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
           
            setCurrentAccount(accounts[0]) 

        } catch (error) {
            console.log(error)
            throw new Error('No ethereum account in wallet object.')
        }
    }

    // send && store transaction info to blockchain
    const sendTransaction = async () => {
        // check for metamask plugin
        if (!ethereum) return alert("You must install the metamask plugin in order to proceed.")

        const { addressTo, amount, keyword, message } = formData
        
        try {
            const transactionContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount)

            // TODO Create Slow, Medium, Fast gas option feature
            // TODO mock eth-converter.com
            // Transaction #1 Send
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount, 
                    to: addressTo,
                    gas: '0x5208',   // 21000 Gwei
                    value: parsedAmount._hex    // Ether
                }]
            })

            // Transaction #2 Store update
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword)

            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`)
            // ethers resolve transaction blockchain receipt
            await transactionHash.wait()
            setIsLoading(false)
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount()
            
            setTransactionCount(transactionCount.toNumber())
 
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum account in wallet object.') 
        }
    }


    return (
        <TransactionContext.Provider value={ { connectWallet, currentAccount, formData, sendTransaction, changeHandler } } >
            {children}
        </TransactionContext.Provider>
    )
}