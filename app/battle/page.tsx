"use client"
import React, { useEffect, useRef, useState } from 'react';
import Editor from '../../components/Editor';
import OpponentEditor from '../../components/OpponentEditor';
import TestCases from '../../components/TestCases';
import { createClient } from '@supabase/supabase-js'

const supabaseClient = createClient(
  'https://jdrrftsbeohpznqghpxr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcnJmdHNiZW9ocHpucWdocHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0OTQ5NzIsImV4cCI6MjAwOTA3MDk3Mn0.3ZXOev203HqvH3X7UWE_B9X7NGYu0Z6tlmFyAi0ii4k'
);

const Battle = () => {

  const [funcName, setFuncName] = useState('foo');
  const [templateCode, setTemplateCode] = useState('')
  const [prompt, setPrompt] = useState('Loading...');
  const [testCases, setTestCases] = useState([]);
  const [progress, setProgress] = useState(0);
  const [opponentCode, setOpponentCode] = useState('Loading...');
  const [opponentProgress, setOpponentProgress] = useState(0);

  useEffect(() => {
    try {
      const algoNum = Math.floor(Math.random() * 2)
      const algo = async () => {
        const { data, error } = await supabaseClient
              .from('algos')
              .select('*')
              .eq('id', 1)
        if (data) {
          console.log('hit if')
          console.log(data)
          setFuncName(data[0].func_name)
          setTemplateCode(data[0].template_code)
          // console.log(data[0].template_code)
          setPrompt(data[0].prompt)
          setTestCases(data[0].test_cases)
        }
      } 
    algo()
    }
    catch (error){
      console.log(error)
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black">
    <h1 style={{fontFamily: 'LuckiestGuy', fontSize: '50px', textAlign: 'left', width: '100%', marginTop: '20px', marginLeft: '20px'}} >AlgoBattles</h1>
    <div className="grid grid-cols-2 grid-rows-2 flex flex-col min-h-screen gap-4 p-4 w-full">
      <Editor templateCode={templateCode}></Editor>
      <OpponentEditor></OpponentEditor>
      <TestCases prompt={prompt} testCases={testCases}></TestCases>
    </div>
    </div>
    );
};

export default Battle;