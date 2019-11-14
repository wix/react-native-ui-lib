
export type BaseComponentPaddingModifierVariations =
  | 'padding-s1' | 'padding-s2' | 'padding-s3' | 'padding-s4' | 'padding-s5'
  | 'padding-s6' | 'padding-s7' | 'padding-s8' | 'padding-s9' | 'padding-s10'

  | 'padding-1' | 'padding-2' | 'padding-3' | 'padding-4' | 'padding-5'
  | 'padding-6' | 'padding-8' | 'padding-10' | 'padding-12' | 'padding-14'
  | 'padding-16' | 'padding-18' | 'padding-20'

  | 'paddingL-s1' | 'paddingL-s2' | 'paddingL-s3' | 'paddingL-s4' | 'paddingL-s5'
  | 'paddingL-s6' | 'paddingL-s7' | 'paddingL-s8' | 'paddingL-s9' | 'paddingL-s10'

  | 'paddingL-1' | 'paddingL-2' | 'paddingL-3' | 'paddingL-4' | 'paddingL-5'
  | 'paddingL-6' | 'paddingL-8' | 'paddingL-10' | 'paddingL-12' | 'paddingL-14'
  | 'paddingL-16' | 'paddingL-18' | 'paddingL-20'

  | 'paddingT-s1' | 'paddingT-s2' | 'paddingT-s3' | 'paddingT-s4' | 'paddingT-s5'
  | 'paddingT-s6' | 'paddingT-s7' | 'paddingT-s8' | 'paddingT-s9' | 'paddingT-s10'

  | 'paddingT-1' | 'paddingT-2' | 'paddingT-3' | 'paddingT-4' | 'paddingT-5'
  | 'paddingT-6' | 'paddingT-8' | 'paddingT-10' | 'paddingT-12' | 'paddingT-14'
  | 'paddingT-16' | 'paddingT-18' | 'paddingT-20'

  | 'paddingR-s1' | 'paddingR-s2' | 'paddingR-s3' | 'paddingR-s4' | 'paddingR-s5'
  | 'paddingR-s6' | 'paddingR-s7' | 'paddingR-s8' | 'paddingR-s9' | 'paddingR-s10'

  | 'paddingR-1' | 'paddingR-2' | 'paddingR-3' | 'paddingR-4' | 'paddingR-5'
  | 'paddingR-6' | 'paddingR-8' | 'paddingR-10' | 'paddingR-12' | 'paddingR-14'
  | 'paddingR-16' | 'paddingR-18' | 'paddingR-20'

  | 'paddingB-s1' | 'paddingB-s2' | 'paddingB-s3' | 'paddingB-s4' | 'paddingB-s5'
  | 'paddingB-s6' | 'paddingB-s7' | 'paddingB-s8' | 'paddingB-s9' | 'paddingB-s10'

  | 'paddingB-1' | 'paddingB-2' | 'paddingB-3' | 'paddingB-4' | 'paddingB-5'
  | 'paddingB-6' | 'paddingB-8' | 'paddingB-10' | 'paddingB-12' | 'paddingB-14'
  | 'paddingB-16' | 'paddingB-18' | 'paddingB-20'

  | 'paddingH-s1' | 'paddingH-s2' | 'paddingH-s3' | 'paddingH-s4' | 'paddingH-s5'
  | 'paddingH-s6' | 'paddingH-s7' | 'paddingH-s8' | 'paddingH-s9' | 'paddingH-s10'

  | 'paddingH-1' | 'paddingH-2' | 'paddingH-3' | 'paddingH-4' | 'paddingH-5'
  | 'paddingH-6' | 'paddingH-8' | 'paddingH-10' | 'paddingH-12' | 'paddingH-14'
  | 'paddingH-16' | 'paddingH-18' | 'paddingH-20'

  | 'paddingV-s1' | 'paddingV-s2' | 'paddingV-s3' | 'paddingV-s4' | 'paddingV-s5'
  | 'paddingV-s6' | 'paddingV-s7' | 'paddingV-s8' | 'paddingV-s9' | 'paddingV-s10'

  | 'paddingV-1' | 'paddingV-2' | 'paddingV-3' | 'paddingV-4' | 'paddingV-5'
  | 'paddingV-6' | 'paddingV-8' | 'paddingV-10' | 'paddingV-12' | 'paddingV-14'
  | 'paddingV-16' | 'paddingV-18' | 'paddingV-20';
export type BaseComponentPaddingModifier = Partial<Record<BaseComponentPaddingModifierVariations, boolean>>;

export type BaseComponentMarginModifierVariations =
  | 'margin-s1' | 'margin-s2' | 'margin-s3' | 'margin-s4' | 'margin-s5'
  | 'margin-s6' | 'margin-s7' | 'margin-s8' | 'margin-s9' | 'margin-s10'

  | 'margin-1' | 'margin-2' | 'margin-3' | 'margin-4' | 'margin-5'
  | 'margin-6' | 'margin-8' | 'margin-10' | 'margin-12' | 'margin-14'
  | 'margin-16' | 'margin-18' | 'margin-20'

  | 'marginL-s1' | 'marginL-s2' | 'marginL-s3' | 'marginL-s4' | 'marginL-s5'
  | 'marginL-s6' | 'marginL-s7' | 'marginL-s8' | 'marginL-s9' | 'marginL-s10'

  | 'marginL-1' | 'marginL-2' | 'marginL-3' | 'marginL-4' | 'marginL-5'
  | 'marginL-6' | 'marginL-8' | 'marginL-10' | 'marginL-12' | 'marginL-14'
  | 'marginL-16' | 'marginL-18' | 'marginL-20'

  | 'marginT-s1' | 'marginT-s2' | 'marginT-s3' | 'marginT-s4' | 'marginT-s5'
  | 'marginT-s6' | 'marginT-s7' | 'marginT-s8' | 'marginT-s9' | 'marginT-s10'

  | 'marginT-1' | 'marginT-2' | 'marginT-3' | 'marginT-4' | 'marginT-5'
  | 'marginT-6' | 'marginT-8' | 'marginT-10' | 'marginT-12' | 'marginT-14'
  | 'marginT-16' | 'marginT-18' | 'marginT-20'

  | 'marginR-s1' | 'marginR-s2' | 'marginR-s3' | 'marginR-s4' | 'marginR-s5'
  | 'marginR-s6' | 'marginR-s7' | 'marginR-s8' | 'marginR-s9' | 'marginR-s10'

  | 'marginR-1' | 'marginR-2' | 'marginR-3' | 'marginR-4' | 'marginR-5'
  | 'marginR-6' | 'marginR-8' | 'marginR-10' | 'marginR-12' | 'marginR-14'
  | 'marginR-16' | 'marginR-18' | 'marginR-20'

  | 'marginB-s1' | 'marginB-s2' | 'marginB-s3' | 'marginB-s4' | 'marginB-s5'
  | 'marginB-s6' | 'marginB-s7' | 'marginB-s8' | 'marginB-s9' | 'marginB-s10'

  | 'marginB-1' | 'marginB-2' | 'marginB-3' | 'marginB-4' | 'marginB-5'
  | 'marginB-6' | 'marginB-8' | 'marginB-10' | 'marginB-12' | 'marginB-14'
  | 'marginB-16' | 'marginB-18' | 'marginB-20'

  | 'marginH-s1' | 'marginH-s2' | 'marginH-s3' | 'marginH-s4' | 'marginH-s5'
  | 'marginH-s6' | 'marginH-s7' | 'marginH-s8' | 'marginH-s9' | 'marginH-s10'

  | 'marginH-1' | 'marginH-2' | 'marginH-3' | 'marginH-4' | 'marginH-5'
  | 'marginH-6' | 'marginH-8' | 'marginH-10' | 'marginH-12' | 'marginH-14'
  | 'marginH-16' | 'marginH-18' | 'marginH-20'

  | 'marginV-s1' | 'marginV-s2' | 'marginV-s3' | 'marginV-s4' | 'marginV-s5'
  | 'marginV-s6' | 'marginV-s7' | 'marginV-s8' | 'marginV-s9' | 'marginV-s10'

  | 'marginV-1' | 'marginV-2' | 'marginV-3' | 'marginV-4' | 'marginV-5'
  | 'marginV-6' | 'marginV-8' | 'marginV-10' | 'marginV-12' | 'marginV-14'
  | 'marginV-16' | 'marginV-18' | 'marginV-20';
export type BaseComponentMarginModifier = Partial<Record<BaseComponentMarginModifierVariations, boolean>>;
