import React from 'react';
import { toast } from 'react-toastify';

function toastMessage(msg, type) {
    if (type === "success") {
        toast.success(msg);
    } else if (type === "warn") {
        toast.warn(msg);
    } else if (type === "info") {
        toast.info(msg);
    } else {
        toast.error(msg);
    }
}

export default toastMessage;