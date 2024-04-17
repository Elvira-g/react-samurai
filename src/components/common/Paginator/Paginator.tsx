import React, { useState } from 'react';
import s from './Paginator.module.css';
import cn from "classnames";

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

const Paginator: React.FC<PaginatorPropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={s.paginator}>
            {portionNumber > 1 && <button className={s.button} onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
            { pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                return <span className={ cn({
                    [s.active]: currentPage === p
                }, s.pageNumber)}
                    onClick={()=> {onPageChanged(p)}} 
                    key={p}>{p}</span> 
            })}
            {portionCount > portionNumber &&
                <button className={s.button} onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>}
        </div>
}

export default Paginator
