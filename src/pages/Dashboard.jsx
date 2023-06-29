import React from 'react'
import { useState } from 'react'
import Card from '../components/Card'
import { BiArrowToRight } from 'react-icons/bi'
import { BiArrowToLeft } from 'react-icons/bi'
import './index.css'

const Dashboard = () => {

    const [Characters, setCharacters] = useState([
        {
            id: 0,
            name: 'HK416',
            price: 7889000,
            category: 'ASSAULT RIFLE',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T3.png'
        },
        {
            id: 1,
            name: 'M950A',
            price: 450000,
            category: 'HANDGUN',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T6.png'
        },
        {
            id: 2,
            name: 'Welrod MkII',
            price: 450000,
            category: 'HANDGUN',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T8.png'
        },
        {
            id: 3,
            name: 'Saiga-12',
            price: 450000,
            category: 'SHOTGUN',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T9.png'
        },
        {
            id: 4,
            name: 'Thompson',
            price: 450000,
            category: 'SUBMACHINE GUN',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T11.png'
        },
        {
            id: 5,
            name: 'G41',
            price: 1670000,
            category: 'ASSAULT RIFLE',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T5.png'
        },
        {
            id: 6,
            name: 'AR-15',
            price: 459000,
            category: 'ASSAULT RIFLE',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T33.png'
        },
        {
            id: 7,
            name: 'M4A1',
            price: 980000,
            category: 'ASSAULT RIFLE',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T36.png'
        },
        {
            id: 8,
            name: 'Thunder',
            price: 459000,
            category: 'HANDGUN',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T37.png'
        },
        {
            id: 9,
            name: 'SPAS-12',
            price: 480000,
            category: 'SHOTGUN',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T41.png'
        },
        {
            id: 10,
            name: 'UMP45',
            price: 489000,
            category: 'SUBMACHINE GUN',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T43.png'
        },
        {
            id: 11,
            name: 'UMP9',
            price: 450000,
            category: 'SUBMACHINE GUN',
            urlImage: 'https://gamerwk.sgp1.cdn.digitaloceanspaces.com/2021/12/T44.png'
        },

    ])

    const [Keywords, setKeywords] = useState('')
    const [idSquence, setIdSequence] = useState(Characters.length);
    const [page, setPage] = useState(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [newCharacter, setNewCharacter] = useState();



    let CharSearch = Characters.filter((Character) => Character.name.toLocaleLowerCase().includes(Keywords) &&
        Character.price >= minPrice &&
        Character.price <= maxPrice
    ).toSorted((a, b) => {
        if (sortOrder === "asc") {
            return a[sortBy] < b[sortBy] ? -1 : 1;
        } else {
            return a[sortBy] > b[sortBy] ? -1 : 1;
        }
    });

    return (
        <div>
            <button onClick={() => setNewCharacter({ id: idSquence })}>Add</button>
            <div className='wrapper-action'>
                <label>
                    Search :
                    <input
                        type="text"
                        onChange={(e) => setKeywords(e.target.value.toLowerCase())}
                    />
                </label>
                <label>
                    Min. price :
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </label>
                <label>
                    Max. price :
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value || Infinity)}
                    />
                </label>
                <select onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="category">category</option>
                </select>
                <select onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">ascending</option>
                    <option value="desc">descending</option>
                </select>
            </div>
            <div className='wrapper-characters'>
                {
                    CharSearch.filter((_Character, i) => i < 4 * page && i >= 4 * page - 4)
                        .map((Character) => {
                            return <Card key={Character.id}>
                                <h4 className='card-name'>{Character.name}</h4>
                                <img className='card-img' src={Character.urlImage} alt="jpg" />
                                <p className='card-category'>{Character.category}</p>
                                <p className='card-category'>IDR. {Character.price}</p>
                            </Card>
                        })
                }
            </div>
            <div className='wrapper-pagination'>
                <button onClick={() => setPage(page - 1)} disabled={page == 1} className='btn-pagination'><BiArrowToLeft size={16} /> Sebelumnya</button>
                <span>{page}</span>
                <button onClick={() => setPage(page + 1)} disabled={page == Math.ceil(Characters.length / 4)} className='btn-pagination'>Selanjutnya <BiArrowToRight size={16} /> </button>
            </div>
            {newCharacter && (
                <form
                    className="cards dialog"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setCharacters([...Characters, newCharacter]);
                        setNewCharacter();
                        setIdSequence(idSquence + 1);
                    }}
                >
                    <h1>Add New Character</h1>
                    <label>
                        ID
                        <input type="text" value={newCharacter.id} readOnly />
                    </label>
                    <label>
                        Name
                        <input
                            type="text"
                            onChange={(e) =>
                                setNewCharacter({ ...newCharacter, name: e.target.value })
                            }
                            required
                            autoFocus
                        />
                    </label>
                    <label>
                        Category
                        <input
                            type="text"
                            onChange={(e) =>
                                setNewCharacter({ ...newCharacter, category: e.target.value })
                            }
                            required
                        />
                    </label> 
                    <label>
                        price
                        <input
                            type="number"
                            onChange={(e) =>
                                setNewCharacter({ ...newCharacter, price: e.target.value })
                            }
                            required
                        />
                    </label>
                    <label>
                        Image
                        <input
                            type="text"
                            onChange={(e) =>
                                setNewCharacter({ ...newCharacter, urlImage: e.target.value })
                            }
                            required
                        />
                    </label>
                    <div>
                        <button onClick={() => setNewCharacter()}>Discard</button>
                        <button>Save</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Dashboard