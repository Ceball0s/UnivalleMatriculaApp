import { StatusBar } from 'expo-status-bar';

import GestorMaterias from '../components/AreaMaterias/GestorMaterias';

export default function materias() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgb(0, 100, 207)'}" />
      <GestorMaterias />
    </>
  );
}

