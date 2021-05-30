//////////////////////////////////////////
//
// NOTE: This is *not* a valid shader file
//
///////////////////////////////////////////
Shader "Hidden/Post FX/Bloom" {
Properties {
_MainTex ("", 2D) = "" { }
_BaseTex ("", 2D) = "" { }
_AutoExposure ("", 2D) = "" { }
}
SubShader {
 Pass {
  ZClip Off
  ZTest Always
  ZWrite Off
  Cull Off
  GpuProgramID 27865
Program "vp" {
SubProgram "d3d9 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "UNITY_COLORSPACE_GAMMA" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "UNITY_COLORSPACE_GAMMA" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "UNITY_COLORSPACE_GAMMA" "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "UNITY_COLORSPACE_GAMMA" "ANTI_FLICKER" }
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
Keywords { "UNITY_COLORSPACE_GAMMA" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "UNITY_COLORSPACE_GAMMA" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "UNITY_COLORSPACE_GAMMA" "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "UNITY_COLORSPACE_GAMMA" "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
}
}
 Pass {
  ZClip Off
  ZTest Always
  ZWrite Off
  Cull Off
  GpuProgramID 67271
Program "vp" {
SubProgram "d3d9 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d9 " {
Keywords { "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "ANTI_FLICKER" }
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
Keywords { "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
Keywords { "ANTI_FLICKER" }
"// shader disassembly not supported on DXBC"
}
}
}
 Pass {
  ZClip Off
  ZTest Always
  ZWrite Off
  Cull Off
  GpuProgramID 170058
Program "vp" {
SubProgram "d3d9 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
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
}
}
 Pass {
  ZClip Off
  ZTest Always
  ZWrite Off
  Cull Off
  GpuProgramID 201666
Program "vp" {
SubProgram "d3d9 " {
"// shader disassembly not supported on DXBC"
}
SubProgram "d3d11 " {
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
}
}
}
}