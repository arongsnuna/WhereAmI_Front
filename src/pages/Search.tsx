
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import sampleImage from '/images/sampleimg.jpg';
import Map from '../components/Main';

const Search = () => {
    const handleLogin = () => {

    };

    const handleSearch = () => {

    };

    const handleImageUpload = () => {

    };

    return (
        <div className="h-screen bg-gray-50 flex items-center justify-center">
            <div className="container mx-auto p-4 max-w-xl">
                <header className="absolute top-0 right-0 py-4 px-6">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
                        로그인
                    </button>
                </header>
                <div className='flex flex-col items-center justify-center mx-auto'>
                    <h1 className="text-2xl mb-4">여긴 어디?</h1>
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
                </div>
                <div className="grid grid-cols-3 gap-4 items-start mt-4">
                    <div className="border border-gray-200 rounded col-span-2 flex flex-col items-center p-4 overflow-hidden">
                        <div>
                            <img src={sampleImage} alt="sample" style={{ width: '640px', maxHeight: '480px', height: 'auto' }} />
                        </div>
                        <h2 className="w-full text-center">경북궁</h2>
                        <p className="w-full text-center">어쩌구 저쩌구</p>
                    </div>
                    <div className='w-full h-full'>
                        <Map />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-start mt-4">
                    <div className="border border-gray-200 rounded flex flex-col items-center p-4 overflow-hidden">
                        <div className="w-full h-2/3">
                            <img src={sampleImage} alt="sample"  />
                        </div>
                        <h2>경북궁</h2>
                        <p>어쩌구 저쩌구</p>
                    </div>
                    <div className="border border-gray-200 rounded flex flex-col items-center p-4 overflow-hidden">
                        <div className="w-full h-2/3">
                            <img src={sampleImage} alt="sample" style={{ width: '360px', maxHeight: '300px', height: 'auto' }} />
                        </div>
                        <h2>경북궁</h2>
                        <p>어쩌구 저쩌구</p>
                    </div>
                    <div className="border border-gray-200 rounded flex flex-col items-center p-4 overflow-hidden">
                        <div className="w-full h-2/3">
                            <img src={sampleImage} alt="sample" style={{ width: '360px', maxHeight: '300px', height: 'auto' }} />
                        </div>
                        <h2>경북궁</h2>
                        <p>어쩌구 저쩌구</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;