export interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class Validator {
  private rules: Map<string, ValidationRule[]> = new Map();

  addRule(field: string, rule: ValidationRule) {
    if (!this.rules.has(field)) {
      this.rules.set(field, []);
    }
    this.rules.get(field)!.push(rule);
  }

  validate(field: string, value: any): ValidationResult {
    const fieldRules = this.rules.get(field) || [];
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const rule of fieldRules) {
      if (!rule.test(value)) {
        if (rule.code.startsWith('WARN_')) {
          warnings.push(rule.message);
        } else {
          errors.push(rule.message);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  validateForm(data: Record<string, any>): Record<string, ValidationResult> {
    const results: Record<string, ValidationResult> = {};
    
    for (const [field, value] of Object.entries(data)) {
      results[field] = this.validate(field, value);
    }
    
    return results;
  }
}

// Common validation rules
export const commonRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    test: (value) => value !== null && value !== undefined && value !== '',
    message,
    code: 'REQUIRED',
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Allow empty if not required
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    message,
    code: 'INVALID_EMAIL',
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Allow empty if not required
      return String(value).length >= min;
    },
    message: message || `Must be at least ${min} characters long`,
    code: 'MIN_LENGTH',
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Allow empty if not required
      return String(value).length <= max;
    },
    message: message || `Must be no more than ${max} characters long`,
    code: 'MAX_LENGTH',
  }),

  pattern: (regex: RegExp, message: string): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Allow empty if not required
      return regex.test(String(value));
    },
    message,
    code: 'PATTERN_MISMATCH',
  }),

  url: (message = 'Please enter a valid URL'): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Allow empty if not required
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message,
    code: 'INVALID_URL',
  }),

  number: (message = 'Please enter a valid number'): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Allow empty if not required
      return !isNaN(Number(value));
    },
    message,
    code: 'INVALID_NUMBER',
  }),

  positiveNumber: (message = 'Please enter a positive number'): ValidationRule => ({
    test: (value) => {
      if (!value) return true; // Allow empty if not required
      const num = Number(value);
      return !isNaN(num) && num > 0;
    },
    message,
    code: 'INVALID_POSITIVE_NUMBER',
  }),

  fileSize: (maxSizeMB: number, message?: string): ValidationRule => ({
    test: (value) => {
      if (!value || !value.size) return true; // Allow empty if not required
      return value.size <= maxSizeMB * 1024 * 1024;
    },
    message: message || `File size must be less than ${maxSizeMB}MB`,
    code: 'FILE_TOO_LARGE',
  }),

  fileType: (allowedTypes: string[], message?: string): ValidationRule => ({
    test: (value) => {
      if (!value || !value.type) return true; // Allow empty if not required
      return allowedTypes.includes(value.type);
    },
    message: message || `File type must be one of: ${allowedTypes.join(', ')}`,
    code: 'INVALID_FILE_TYPE',
  }),
};

// Form validation schemas
export const formSchemas = {
  contact: () => {
    const validator = new Validator();
    validator.addRule('name', commonRules.required('Name is required'));
    validator.addRule('name', commonRules.minLength(2, 'Name must be at least 2 characters'));
    validator.addRule('email', commonRules.required('Email is required'));
    validator.addRule('email', commonRules.email());
    validator.addRule('message', commonRules.required('Message is required'));
    validator.addRule('message', commonRules.minLength(10, 'Message must be at least 10 characters'));
    return validator;
  },

  codeAnalysis: () => {
    const validator = new Validator();
    validator.addRule('code', commonRules.required('Code is required'));
    validator.addRule('code', commonRules.minLength(10, 'Code must be at least 10 characters'));
    validator.addRule('filename', commonRules.required('Filename is required'));
    validator.addRule('filename', commonRules.pattern(/\.(ts|tsx|js|jsx)$/i, 'File must be a TypeScript or JavaScript file'));
    return validator;
  },

  userProfile: () => {
    const validator = new Validator();
    validator.addRule('name', commonRules.required('Name is required'));
    validator.addRule('name', commonRules.minLength(2, 'Name must be at least 2 characters'));
    validator.addRule('email', commonRules.required('Email is required'));
    validator.addRule('email', commonRules.email());
    validator.addRule('website', commonRules.url('Please enter a valid website URL'));
    return validator;
  },
};

import React from 'react';

// Real-time validation hook
export function useValidation<T extends Record<string, any>>(
  schema: Validator,
  initialData: T
) {
  const [data, setData] = React.useState<T>(initialData);
  const [errors, setErrors] = React.useState<Record<string, ValidationResult>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validateField = React.useCallback((field: string, value: any) => {
    const result = schema.validate(field, value);
    setErrors(prev => ({ ...prev, [field]: result }));
    return result;
  }, [schema]);

  const validateForm = React.useCallback(() => {
    const results = schema.validateForm(data);
    setErrors(results);
    return Object.values(results).every(result => result.isValid);
  }, [schema, data]);

  const setFieldValue = React.useCallback((field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  }, [touched, validateField]);

  const setFieldTouched = React.useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, data[field]);
  }, [validateField, data]);

  const reset = React.useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  return {
    data,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateForm,
    reset,
    isValid: Object.values(errors).every(result => result.isValid),
  };
} 