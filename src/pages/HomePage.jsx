import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HobbyList from '../components/Home/HobbyList';
import casual from 'casual-browserify'
import { addNewHobby, setActiveHobby } from '../actions/hobby';

function HomePage(props) {
    //useSelector : strict comparison 
    //(compare giá trị cũ vs mới dùng 3 dấu ===)
    //strict comparison != shallow comparison
    //vd: {a,b} {a,b}
    //strict : bê nguyên 2 cục obj compare vs nhau (2 cục này sẽ ko cùng trỏ về 1 địa chỉ, tham chiếu; nên compare lúc nào cx false)
    //shallow : bốc từng key để compare vs nhau (a vs a, b vs b)
    //ở đây là sẽ compare state cũ vs state mới
    //nên tách useSelector ra ko gộp thành 1 obj
    const hobbyList = useSelector(state => state.hobby.list);
    const activeId = useSelector(state => state.hobby.activeId);
    const dispatch = useDispatch();

    console.log('hobbyList: ', hobbyList);

    // npm install --save casual-browserify : random dữ liệu
    const handleAddHobbyClick = () =>{
        //Random a hobby object: id + title
        const newHobby = {
            id: casual.uuid,
            title: casual.title
        }

        //Dispatch action to add new hobby to redux store
        const action = addNewHobby(newHobby);
        dispatch(action);
    }

    const handleHobbyClick = (hobby) =>{
        //Dispatch action to set ActiveHobby to redux store
        const action = setActiveHobby(hobby);
        dispatch(action);
    }

    return (
        <div className="home-page">
            <h1>Home</h1>
            <button onClick={() => handleAddHobbyClick()}>Random Hobby</button>
            <HobbyList 
                hobbyList={hobbyList}
                activeId={activeId}
                onHobbyClick={handleHobbyClick}
            />
        </div>
    );
}

export default HomePage;