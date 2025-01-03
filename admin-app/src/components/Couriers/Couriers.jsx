import React, { useEffect, useState } from 'react';
import './Couriers.css'
import { useTable } from 'react-table'
import { useToast } from '../Context/Toast/ToastContext';
import axios from 'axios';

const Couriers = () => {
    const { showToastMessage } = useToast();

    return (
        <div>
            <h1>Couriers</h1>
        </div>
    )
}

export default Couriers;