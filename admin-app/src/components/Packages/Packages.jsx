import React, { useEffect, useState } from 'react';
import './Packages.css'
import { useTable } from 'react-table'
import { useToast } from '../Context/Toast/ToastContext';
import axios from 'axios';

const Packages = () => {
    const { showToastMessage } = useToast();

    return (
        <div>
            <h1>Packages</h1>
        </div>
    )
}

export default Packages;