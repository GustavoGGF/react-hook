/**
 * TODO:
 *  [] Field Arrays!
 * ![] Upload de arquivos!
 * ![] Composition Pattern!
 *  TODO

*/
//* Importando todas as dependências
import { useFieldArray, useForm } from "react-hook-form";
import { Main, Span, Div, Input } from "./assets/styles/AppStyle";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "./assets/lib/API";
//* Importando todas as dependências

//? criando as verificações de login
const createUserFormSchema = z.object({
  avatar: z
    .instanceof(FileList)
    .transform((list) => list.item(0))
    .refine(
      (file) => file.size <= 5 * 2024 * 2024,
      "O arquivo tem que se menor que 5MB"
    ),
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
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("O titulo é obrigatório"),
        knowledge: z.coerce.number().min(1).max(100),
      })
    )
    .min(2, "Insira pelo menos 2 tecnologias")
    .refine((techs) => {
      return techs.some((tech) => tech.knowledge > 50);
    }, "Você está aprendendo!"),
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
  //! adicionar o remove
  const { fields, append } = useFieldArray({
    control,
    name: "techs",
  });

  function addNewTec() {
    append({ title: "", knowledge: 0 });
  }

  async function createUser(data) {
    await supabase.storage
      .from("form-react")
      .upload(data.avatar.name, data.avatar);
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <Main className="d-flex flex-column align-items-center justify-content-center">
      <form className="d-flex flex-column" onSubmit={handleSubmit(createUser)}>
        <div>
          <label htmlFor="avatar" className="p-2 fontWT">
            Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            {...register("avatar")}
          />
          {/* Se algum dado não estiver correto, aparecerá mensagem de erro */}
          {errors.avatar && (
            <Span className="fontRBTSL">{errors.avatar.message}</Span>
          )}
          {/* Se algum dado não estiver correto, aparecerá mensagem de erro */}
        </div>
        <div>
          <label htmlFor="name" className="p-2 fontWT">
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
          <label htmlFor="email" className="p-2 fontWT">
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
          <label htmlFor="password" className="p-2 fontWT">
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
          <label htmlFor="" className="p-2  d-flex flex-column">
            <span className="text-center fontWT">Tecnologias</span>
            <button
              type="button"
              className="btn btn-info mt-3"
              onClick={addNewTec}
            >
              Adicionar
            </button>
          </label>

          {fields.map((field, index) => {
            field.id;
            return (
              <div
                className="d-flex mt-2 justify-content-center flex-column"
                key={field.id}
              >
                <div className="d-flex justify-content-center">
                  <Div>
                    <input
                      type="text"
                      className="form-control w-100"
                      {...register(`techs.${index}.title`)}
                    />
                  </Div>
                  <Input
                    type="number"
                    className="form-control"
                    {...register(`techs.${index}.knowledge`)}
                  />
                </div>
                <div className="d-flex flex-column text-center">
                  {errors.techs?.[index]?.title && (
                    <Span className="fontRBTSL">
                      {errors.techs?.[index]?.title.message}
                    </Span>
                  )}

                  {errors.techs?.[index]?.knowledge && (
                    <Span className="fontRBTSL">
                      {errors.techs?.[index]?.knowledge.message}
                    </Span>
                  )}
                </div>
              </div>
            );
          })}
          <div className="mt-3 text-center">
            {errors.techs && (
              <Span className="fontRBTSL">{errors.techs.message}</Span>
            )}
          </div>
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
