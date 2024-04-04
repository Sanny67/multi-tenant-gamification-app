import React from 'react';
import { BASE_URL } from '../utils/API';
import RowBackgroundSvg from './rowBackground';

const RankImage = ({imageName}) => (
    imageName === "" ? " " : <img className="mr-2 h-[80%] mt-[-15px] ml-3" src={`${BASE_URL}/storage/assets/${imageName}`} alt="Rank Image" />
);

const UserData = ({ user }) => {

    const rankImageName = user.rank === 1 ? 'first.png' : user.rank === 2 ? 'second.png' : user.rank === 3 ? 'third.png' : '';

    return (
        <div className="content">
            <div className='top-border'></div>
            <div className='bottom-border-1'></div>
            <div className='bottom-border-2'></div>
            <div className='right-border'></div>
            <div className='left-border'></div>
            {/* <div style={{height: '100%', position: 'absolute', top: 0, left: 0}}><RowBackgroundSvg/></div> */}
            {/* <RowBackgroundSvg/> */}
            <div>
                <RankImage imageName={rankImageName} />
            </div>
            <div>
                <img className="userAvatar rounded-full" src={`${BASE_URL}/storage/assets/${user.image === "defaultMan" ? "man.png" : "woman.png"}`} alt="User avatar" />
            </div>
            <div className="font-bold text-2xl">{user.name}</div>
            <div className="font-bold text-2xl">{user.xp_points}</div>
        </div>
    );
};

export default UserData;
