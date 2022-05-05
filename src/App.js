import React, { Suspense, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Html } from "@react-three/drei"
import Model from "./components/model/Model"
import Overlay from "./components/overlay/Overlay"

export default function App() {
  const overlay = useRef()
  const caption = useRef()
  const scroll = useRef(0)
  const [loading, setLoading] = useState(false)

  const LoadingBar = () => {
    return (
      // <Html center>
        <div style={{ background: '#000000', width: '100vw', height: '100vh', display:'flex', justifyContent:'center', alignItems:'center' }} >
          <img alt="loading" src="img/loading.gif"/>
        </div>
      // </Html>
    )
  }

  return (
    <>
      <Suspense  fallback={LoadingBar()}>
        <Canvas
          shadows
          onCreated={(state) => state.events.connect(overlay.current)}
        >
          <ambientLight intensity={0.02} />
          <Suspense>
            <Model scroll={scroll} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
        <Overlay ref={overlay} caption={caption} scroll={scroll} />
      </Suspense>
    </>
  )
}
