/**
 * TODO:
 *  [] Field Arrays!
 * ![] Upload de arquivos!
 * ![] Composition Pattern!
 *  TODO

*/
//* Importando todas as dependências
import { useFieldArray, useForm } from "react-hook-form";
import { Main, Span } from "./assets/styles/AppStyle";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//* Importando todas as dependências

//? criando as verificações de login
const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("Nome obrigatório!")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" "); //? deixa a primeira letra do nome em maiusculo
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório!")
    .email("Formato de e-mail é inválido")
    .toLowerCase()
    .refine((email) => email.endsWith("@lupatech.com.br")), //? verifica se o e-mail possui "@lupatech.com.br"
  password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres!"),
  techs: z.array(
    z.object({
      title: z.string().nonempty("O titulo é obrigatório"),
      knowledge: z.number().min(1).max(100),
    })
  ),
});
//? criando as verificações de login

//* Função principal
export default function App() {
  const [output, setOutput] = useState("");

  //?Aqui o createUserForm é inserido no programa para validação
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(createUserFormSchema),
  });
  //?Aqui o createUserForm é inserido no programa para validação

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

  function createUser(data) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <Main className="d-flex flex-column align-items-center justify-content-center">
      <form className="d-flex flex-column" onSubmit={handleSubmit(createUser)}>
        <div>
          <label htmlFor="name" className="p-2">
            Nome
          </label>
          <input type="text" className="form-control" {...register("name")} />
          {/* Se algum dado não estiver correto, aparecerá mensagem de erro */}
          {errors.name && (
            <Span className="fontRBTSL">{errors.name.message}</Span>
          )}
          {/* Se algum dado não estiver correto, aparecerá mensagem de erro */}
        </div>
        <div>
          <label htmlFor="email" className="p-2">
            E-mail
          </label>
          <input type="email" className="form-control" {...register("email")} />
          {/* Se algum dado não estiver correto, aparecerá mensagem de erro */}
          {errors.email && (
            <Span className="fontRBTSL">{errors.email.message}</Span>
          )}
          {/* Se algum dado não estiver correto, aparecerá mensagem de erro */}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="p-2">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            {...register("password")}
          />
          {/* Se algum dado não estiver correto, aparecerá mensagem de erro */}
          {errors.password && (
            <Span className="fontRBTSL">{errors.password.message}</Span>
          )}
          {/* Se algum dado não estiver correto, aparecerá mensagem de erro */}
        </div>
        <div className="mb-5">
          <label htmlFor="" className="p-2">
            Tecnologias
          </label>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Salvar
        </button>
      </form>
      <pre>{output}</pre>
    </Main>
  );
}
//* Função principal
