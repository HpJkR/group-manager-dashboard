export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Class = {
  __typename?: 'Class';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  year: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addClass: Class;
  addStudent: Student;
  deleteClass: Scalars['Boolean']['output'];
  deleteStudent: Scalars['Boolean']['output'];
  updateClass?: Maybe<Class>;
  updateStudent?: Maybe<Student>;
};


export type MutationAddClassArgs = {
  data: NewClassInput;
};


export type MutationAddStudentArgs = {
  data: NewStudentInput;
};


export type MutationDeleteClassArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateClassArgs = {
  data: UpdateClassInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateStudentArgs = {
  data: UpdateStudentInput;
  id: Scalars['Int']['input'];
};

export type NewClassInput = {
  name: Scalars['String']['input'];
  year: Scalars['Float']['input'];
};

export type NewStudentInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  classId: Scalars['Int']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  telephone?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllClasses: Array<Class>;
  getAllStudents: Array<Student>;
  getClassById?: Maybe<Class>;
  getClassesByName: Array<Class>;
  getStudentById?: Maybe<Student>;
  getStudentsByClass: Array<Student>;
  getStudentsByFirstname: Array<Student>;
  getStudentsByLastname: Array<Student>;
};


export type QueryGetClassByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetClassesByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetStudentByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetStudentsByClassArgs = {
  classId: Scalars['Int']['input'];
};


export type QueryGetStudentsByFirstnameArgs = {
  firstname: Scalars['String']['input'];
};


export type QueryGetStudentsByLastnameArgs = {
  lastname: Scalars['String']['input'];
};

export type Student = {
  __typename?: 'Student';
  avatar?: Maybe<Scalars['String']['output']>;
  class?: Maybe<Class>;
  email?: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  telephone?: Maybe<Scalars['String']['output']>;
};

export type UpdateClassInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateStudentInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  classId?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  telephone?: InputMaybe<Scalars['String']['input']>;
};
