
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const handleLogin = () => {

    };

    const handleSearch = () => {

    };

    const handleImageUpload = () => {

    };

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <header className='absolute top-0 right-0 py-4 px-6 z-50'>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
                    로그인
                </button>
            </header>

            <div className='flex flex-col items-center justify-center'>
                <div>
                    <h1 className='text-2xl mb-4 text-center'>여긴 어디?</h1>
                        <div className='w-full flex justify-center'>
                            <div className='relative border border-gray-200 rounded-lg mt-2 mr-2 inline-block'>
                                <FontAwesomeIcon icon={faSearch} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="검색 입력"
                                    className="pl-8 py-2 pr-4 bg-transparent w-full outline-none"
                                    onChange={handleSearch}
                                />
                                
                            </div>
                    <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2"
                            onClick={handleImageUpload}
                    >
                        이미지 업로드
                    </button>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2"
                    >
                        검색
                    </button>
                </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Search;
