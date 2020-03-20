import React, {useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import {User} from './dec'
import './App.css'
import './css/style.css'

export interface Decoded extends User {
	exp: number
}

const App: React.FC = () => {
	let [user, setUser] = useState<Decoded | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>('')

	useEffect(() => {
		decodeToken(null)
	}, [])
	const updateUser = (newToken: string | null) => {
		if(newToken) {
			localStorage.setItem('mernToken', newToken)
			decodeToken(newToken)
		} else {
			setUser(null)
		}
	}
	const decodeToken = (existingToken: string | null) => {
		let token = existingToken || localStorage.getItem('mernToken')
		if (token) {
			let decoded : Decoded = jwtDecode(token)
		
			if(!decoded || Date.now() >= decoded.exp * 1000) {
				console.log('expired')
				setUser(null)
			} else {
				setUser(decoded)
			}
		} else {
			setUser(null)
		}
	}
    return (
        <BrowserRouter>
            <div className="App body">
                <Header updateUser={updateUser} user={user} setSearchTerm={setSearchTerm} />
								<div className="content">
                	<Content updateUser={updateUser} user={user} searchTerm={searchTerm} />
								</div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App
