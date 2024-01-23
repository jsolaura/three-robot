import React, {useLayoutEffect, useRef} from 'react'
import {useGLTF, useScroll} from '@react-three/drei'
import {useFrame} from "@react-three/fiber";
import gsap from 'gsap';

export function Robot(props) {
    const {nodes, materials} = useGLTF('./models/robot/phantoms-transformed.glb');
    const robotRef = useRef();
    const scroll = useScroll();
    const timeline = useRef();

    useFrame((state, delta) => {
        timeline.current.seek(scroll?.offset * timeline.current.duration())
    })

    useLayoutEffect(()=> {
        timeline.current = gsap.timeline({defaults: {duration: 2, ease: 'power1.inOut'}});

        timeline.current
            .to(robotRef?.current.rotation, {y: -1}, 2)
            .to(robotRef?.current.position, {x: 1}, 2)

            .to(robotRef?.current.rotation, {y: 1}, 6)
            .to(robotRef?.current.position, {x: -1}, 6)

            .to(robotRef?.current.rotation, {y: 0}, 11)
            .to(robotRef?.current.rotation, {x: 1}, 11)
            .to(robotRef?.current.position, {x: 0}, 11)

            .to(robotRef?.current.rotation, {y: 0}, 13)
            .to(robotRef?.current.rotation, {x: -1}, 13)
            .to(robotRef?.current.position, {x: 0}, 13)

            .to(robotRef?.current.rotation, {y: 0}, 16)
            .to(robotRef?.current.rotation, {x: 0}, 16)
            .to(robotRef?.current.position, {x: 0}, 16)

            .to(robotRef?.current.rotation, {y: 0}, 20)
            .to(robotRef?.current.rotation, {x: 0}, 20)
            .to(robotRef?.current.position, {x: 0}, 20)

    },[])

    return (
        <group {...props} dispose={null} ref={robotRef}>
            <group position={[-0.21, 0.16, 0.37]} rotation={[0, 0, 0]} scale={0.15}>
                <mesh geometry={nodes.Cube003.geometry} material={materials.Metal} castShadow={true}>
                    <meshPhysicalMaterial
                        // color="#7B4D31FF"
                        color="#aaa"
                        roughness={0.2}
                        metalness={1}
                        reflectivity={0.5}
                        iridescence={0.3}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[100,1000]}
                    />
                </mesh>
                <mesh geometry={nodes.Cube003_1.geometry} material={materials.Metal} castShadow={true}>
                    <meshPhysicalMaterial
                        color="#000000"
                        roughness={1}
                        // emissive={'#ffa77b'}
                        emissive={'#000'}
                        clearcoat={1}
                        reflectivity={0.2}
                        metalness={0}
                        iridescence={0.1}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[100,1000]}
                    />
                </mesh>
            </group>
        </group>
    );
}


useGLTF.preload('./models/robot/phantoms-transformed.glb')
