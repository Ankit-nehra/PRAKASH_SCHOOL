// src/components/Loader.js
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

export const startLoading = () => NProgress.start();
export const stopLoading = () => NProgress.done();
