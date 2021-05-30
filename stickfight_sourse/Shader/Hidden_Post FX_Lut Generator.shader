//////////////////////////////////////////
//
// NOTE: This is *not* a valid shader file
//
///////////////////////////////////////////
Shader "Hidden/Post FX/Lut Generator" {
Properties {
}
SubShader {
 Pass {
  ZClip Off
  ZTest Always
  ZWrite Off
  Cull Off
  GpuProgramID 24723
Program "vp" {
SubProgram "d3d9 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "TONEMAPPING_NEUTRAL" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "TONEMAPPING_NEUTRAL" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "TONEMAPPING_FILMIC" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "TONEMAPPING_FILMIC" }
"// shader disassembly not supported on DXBC"
}
}
Program "fp" {
SubProgram "d3d9 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "TONEMAPPING_NEUTRAL" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "TONEMAPPING_NEUTRAL" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "TONEMAPPING_FILMIC" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "TONEMAPPING_FILMIC" }
"// shader disassembly not supported on DXBC"
}
}
}
}
}