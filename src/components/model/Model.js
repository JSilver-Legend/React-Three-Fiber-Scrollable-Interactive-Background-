import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

const color = new THREE.Color()

export default function Model({ scroll, ...props }) {
  const group = useRef()
  const nodes_1 = useGLTF("/model_1.glb").nodes
  const nodes_2 = useGLTF("/model_2.glb").nodes
  const nodes_2_1 = useGLTF("/model_2_1.glb").nodes
  const nodes_3 = useGLTF("/model_3.glb").nodes
  const materials_1 = useGLTF("/model_1.glb").materials
  const materials_3 = useGLTF("/model_3.glb").materials
  const animations_1 = useGLTF("/model_1.glb").animations
  const animations_2 = useGLTF("/model_2.glb").animations
  const animations_2_1 = useGLTF("/model_2_1.glb").animations
  const animations_3 = useGLTF("/model_3.glb").animations
  const actions_1 = useAnimations(animations_1, group).actions
  const actions_2 = useAnimations(animations_2, group).actions
  const actions_2_1 = useAnimations(animations_2_1, group).actions
  const actions_3 = useAnimations(animations_3, group).actions
  const extras = { receiveShadow: true, castShadow: true, "material-envMapIntensity": 0.2 }
  useEffect(() => void (actions_1['All Animations'].play().paused = true, 
  actions_2['All Animations'].play().paused = true,
  actions_2_1['All Animations'].play().paused = true,
  actions_3['All Animations'].play().paused = true,
  []))
  useFrame((state) => {
    actions_1['All Animations'].time = THREE.MathUtils.lerp(actions_1['All Animations'].time, actions_1['All Animations'].getClip().duration * scroll.current, 0.05)
    actions_2['All Animations'].time = THREE.MathUtils.lerp(actions_2['All Animations'].time, actions_2['All Animations'].getClip().duration * scroll.current, 0.05)
    actions_2_1['All Animations'].time = THREE.MathUtils.lerp(actions_2_1['All Animations'].time, actions_2['All Animations'].getClip().duration * scroll.current, 0.05)
    actions_3['All Animations'].time = THREE.MathUtils.lerp(actions_3['All Animations'].time, actions_3['All Animations'].getClip().duration * scroll.current, 0.05)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[0.06, 4.04, 0.35]}
        scale={[500, 500, 500]}>
        <mesh name="model_1" geometry={nodes_1.model_1.geometry} material={materials_3.Material_001} {...extras} />
        <mesh name="model_2" geometry={nodes_2.model_2.geometry} material={materials_3.Material_001} {...extras} />
        <mesh name="model_2_1" geometry={nodes_2_1.model_2_1.geometry} material={materials_3.Material_001} {...extras} />
        <mesh name="model_3" geometry={nodes_3.model_3.geometry} material={materials_3.Material_001} {...extras} />
      </group>
      <group name="Camera" position={[-1.78, 2.04, 23.58]} rotation={[1.62, 0.01, 0.11]}>
        <PerspectiveCamera makeDefault far={400} near={0.1} fov={28} rotation={[-Math.PI / 2, 0, 0]}>
          <pointLight intensity={0.5} position={[10, 15, -50]} />
        </PerspectiveCamera>
      </group>
    </group>
  )
}

useGLTF.preload("/model.glb")
