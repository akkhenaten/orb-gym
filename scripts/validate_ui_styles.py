#!/usr/bin/env python3
"""UI catalogue/settings/token consistency checks; no rendered UI certification."""
import json,sys
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def read(p):return json.loads((R/p).read_text())
errors=[]
def ck(ok,msg):
 if not ok:errors.append(msg)
opts=read('docs/design/style-options.json');config=read('docs/design/appearance-settings-contract.json');themes=read('docs/design/theme-tokens.json')['themes']
expected={'basic-01','flat-02','editorial-03','glass-04','console-05'}
# 9 Nov 2026: founder confirmed five selectable presets; neumorphic-06 is deferred, not selectable.
selectable={x['preset_id'] for x in opts['presets'] if x.get('selectable',True)}
ck(selectable==expected and len(selectable)==5,'Five selectable presets required')
ck({x['preset_id'] for x in opts['presets']}>=expected,'Deferred preset removed from catalogue entirely')
ck(opts['default_preset_id']=='basic-01' and opts['settings_screen_id']=='SCR-075','Default or settings target changed')
required={(p,m) for p in expected for m in ['light','dark']}
ck(required<={(t['preset_id'],t['mode']) for t in themes},'Ten complete style modes required for the five selectable presets')
for key in ['draft_only_preview','expected_version_required','atomic_validated_snapshot','failure_keeps_published','preserve_work_in_progress','rollback_versioned','white_label_activation_is_separate','invalid_draft_blocks_publish']:ck(config['publication'].get(key) is True,'Unsafe appearance publication: '+key)
for key in ['opaque_fallback_required','visible_control_boundaries_required','state_not_shadow_only']:ck(config['accessibility'].get(key) is True,'Missing effects protection: '+key)
ck(config['authority'].get('publish')==['branding.publish'] and config['authority'].get('white_label_activation')==['branding.activate_white_label'],'Style publish conflated with identity activation')
ck(config['authority'].get('gym_override')==['branding.edit_gym','branding.publish'],'Gym appearance authority lost')
permissions={x['permission_id'] for x in read('docs/access/permission-catalogue.json')['permissions']}
for ps in config['authority'].values():
 if isinstance(ps,list):ck(set(ps)<=permissions,'Unknown appearance permission')
screens={x['screen_id']:x for x in read('docs/design/screen-inventory.json')['screens']}
ck(screens['SCR-075'].get('appearance_contract')=='docs/design/appearance-settings-contract.json','Settings screen not linked to appearance contract')
for t in themes:
 e=t.get('effects',{});p=t['preset_id'];tag=p+'.'+t['mode']
 ck(e.get('opaqueFallback')==t['semantic']['surface'] and e.get('reducedEffectsBlurPx')==0 and e.get('reducedEffectsShadow')=='none','Missing resolved solid fallback '+tag)
 ck(e.get('focusRingPx',0)>=2 and e.get('controlBorderPx',0)>=1 and t['size']['touchTargetPx']>=44,'Missing explicit focus/control/touch boundaries '+tag)
 if p=='neumorphic-06':
  ck('inset' in e.get('inputInsetShadow','') and 'inset' in e.get('controlPressedShadow','') and e.get('controlRaisedShadow')!='none' and e.get('cardShadow')!='none','Neumorphic depth mapping missing '+tag)
  ck(e.get('glassBlurPx')==0,'Neumorphic unexpectedly requires glass '+tag)
 if p=='glass-04':ck(e.get('glassBlurPx',0)>0 and 'radial-gradient' in e.get('decorativeBackground','') and e.get('glassSurface')!=t['semantic']['surface'],'Glass treatment missing '+tag)
 if p=='flat-02':ck(all(e.get(k)=='none' for k in ['cardShadow','controlRaisedShadow','controlPressedShadow','inputInsetShadow','iconShadow','decorativeBackground']) and e.get('glassBlurPx')==0,'Flat accidentally gains decorative depth '+tag)
for key in ['selection_contract','rules','canonical_values']:ck((R/opts[key]).is_file(),'Missing style source '+key)
text=(R/opts['rules']).read_text()
for i in range(1,11):ck('UI35-'+str(i).zfill(2) in text,'Missing authored acceptance UI35-'+str(i))
print(json.dumps({'edition':'0.35','style_options':len(selectable),'deferred_presets':len(opts['presets'])-len(selectable),'theme_modes':len(themes),'errors':errors,'scope':'Static catalogue, settings boundaries and selected effect tokens only; no preview/browser/assistive-technology/runtime tests'},indent=2));sys.exit(bool(errors))
