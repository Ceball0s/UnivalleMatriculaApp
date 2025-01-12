import { StatusBar } from 'expo-status-bar';

import Login from '../components/AreaLogin/Login';


export default function index() {
  return (
    <>
        <StatusBar barStyle="light-content" backgroundColor="rgb(119, 0, 0)" />
        <Login color="rgb(119, 0, 0)" />
    </>
  );
}

