import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Flashbar from '../components/Flashbar';
import TextBody from '../components/TextBody';
import Modal from '../components/Modal';
import styled from 'styled-components';

const NotesContainer = styled.section`
  display: flex;
  justify-content: space-evenly;
  overflow: hidden;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem 0;
  flex: 1 0 35%;
  max-width: 50%;
  border-left: 1px solid #d3d3d3;
  background-color: #f4f4f4;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
`

const Summary = () => {
  const modals = useSelector(state => state.modals);

  return (
    <Container>
      <Flashbar />
      <NotesContainer>
        <TextBody htmlToRender={"test"} />
        <ModalContainer>
          <Modal keyword={"Processor"} htmlToRender={`A central processing unit (CPU), also called a central processor, main processor or just processor, is the electronic circuitry within a computer that executes instructions that make up a computer program. The CPU performs basic arithmetic, logic, controlling, and input/output (I/O) operations specified by the instructions in the program. This contrasts with external components such as main memory and I/O circuitry,[1] and specialized processors such as graphics processing units (GPUs).

The computer industry used the term "central processing unit" as early as 1955.[2][3]

The form, design, and implementation of CPUs have changed over time, but their fundamental operation remains almost unchanged. Principal components of a CPU include the arithmetic logic unit (ALU) that performs arithmetic and logic operations, processor registers that supply operands to the ALU and store the results of ALU operations, and a control unit that orchestrates the fetching (from memory) and execution of instructions by directing the coordinated operations of the ALU, registers and other components.

Most modern CPUs are implemented on integrated circuit (IC) microprocessors, with one or more CPUs on a single metal-oxide-semiconductor (MOS) IC chip. Microprocessors chips with multiple CPUs are multi-core processors. The individual physical CPUs, processor cores, can also be multithreaded to create additional virtual or logical CPUs.[4]

An IC that contains a CPU may also contain memory, peripheral interfaces, and other components of a computer; such integrated devices are variously called microcontrollers or systems on a chip (SoC).

Array processors or vector processors have multiple processors that operate in parallel, with no unit considered central. Virtual CPUs are an abstraction of dynamical aggregated computational resources.`} />
          <Modal keyword={"test"} htmlToRender={"test"} />
        </ModalContainer>
      </NotesContainer>
    </Container>
  )
}

export default Summary;