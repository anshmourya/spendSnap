// import React from 'react'

import { H5, P } from "../typography"

const Card = ({ total, head }) => {
    return (
        <div className="cursor-default to-lack relative max-w-md overflow-hidden rounded-xl border border-white/[10%] bg-gradient-to-r from-[#111111] p-6 shadow-2xl">
            <H5>{head}</H5>
            <P>&#8377;  {total}</P>
        </div>
    )
}

export default Card