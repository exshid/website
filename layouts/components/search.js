import { useState } from 'react'

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])

    const search = async () => {
        const res = await fetch(`/api/search?search=${searchTerm}`)
        const data = await res.json()
        setResults(data)
    }

    return (
        <div>
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <button onClick={search}>Search</button>
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.title}</li>
                ))}
            </ul>
        </div>
    )
}
