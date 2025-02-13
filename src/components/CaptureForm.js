"use client";

import { useForm } from "react-hook-form";

export default function CaptureForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const transformedData = {
      ok: "HardTask created successfully.",
      task: {
        title: data.title,
        description: data.description,
        tags: data.tags
          ? data.tags.split(/[,\s]+/).map((tag) => tag.trim())
          : [],
        budget_from: parseInt(data.budget_from, 10),
        budget_to: parseInt(data.budget_to, 10),
        deadline_days: parseInt(data.deadline_days, 10),
        number_of_reminders: parseInt(data.number_of_reminders, 10),
        private_content: data.private_content || null,
        is_hard: data.is_hard || false,
        all_auto_responses: data.all_auto_responses || false,
        rules: {
          budget_from: 5000,
          budget_to: 8000,
          deadline_days: 5,
          qty_freelancers: 1,
          task_id: 2236,
        },
      },
    };
    // Мок-отправка данных на сервер
    try {
      const response = await mockRequest(transformedData);
      if (response.status === 200) {
        // console.log("Сформированный JSON:", transformedData);
        alert("Задача успешно опубликована!");
        reset(); // Сбрасываем все поля, кроме токена
      } else {
        throw new Error("Ошибка при публикации задачи.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Мок-функция для отправки данных с заголовком
  const mockRequest = (data) => {
    const token = localStorage.getItem("token");
    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
          console.log("Отправка данных на сервер:", data);
          console.log("Заголовок Authorization:", `Bearer ${token}`);
        }
        resolve({ status: isSuccess ? 200 : 500 });
      }, 1000);
    });
  };

  // Проверяем наличие тест-токена
  if (!localStorage.getItem("token")) {
    localStorage.setItem("token", "mockToken123");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg space-y-8"
      autoComplete="off"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Title */}
        <div className="sm:col-span-6">
          <label
            htmlFor="title"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Заголовок задачи
          </label>
          <div className="mt-2 relative">
            <input
              id="title"
              type="text"
              {...register("title", { required: "Заголовок обязателен" })}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 absolute top-9 left-0">
                {errors.title.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="sm:col-span-6">
          <label
            htmlFor="description"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Описание задачи
          </label>
          <div className="mt-2 relative">
            <textarea
              id="description"
              rows="4"
              {...register("description", { required: "Описание обязательно" })}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1 absolute top-25 left-0">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="sm:col-span-6">
          <label
            htmlFor="tags"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Теги
          </label>
          <div className="mt-2 relative">
            <input
              id="tags"
              type="text"
              {...register("tags")}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Budget */}
        <div className="sm:col-span-3">
          <label
            htmlFor="budget_from"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Минимальный бюджет (₽)
          </label>
          <div className="mt-2 relative">
            <input
              id="budget_from"
              type="number"
              {...register("budget_from", {
                required: "Минимальный бюджет обязателен",
                min: { value: 5000, message: "Минимум 5000" },
                max: { value: 8000, message: "Максимум 8000" },
              })}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.budget_from && (
              <p className="text-red-500 text-xs mt-1 absolute top-9 left-0">
                {errors.budget_from.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="budget_to"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Максимальный бюджет (₽)
          </label>
          <div className="mt-2 relative">
            <input
              id="budget_to"
              type="number"
              {...register("budget_to", {
                required: "Максимальный бюджет обязателен",
                min: { value: 5000, message: "Минимум 5000" },
                max: { value: 8000, message: "Максимум 8000" },
              })}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.budget_to && (
              <p className="text-red-500 text-xs mt-1 absolute top-9 left-0">
                {errors.budget_to.message}
              </p>
            )}
          </div>
        </div>

        {/* Deadline */}
        <div className="sm:col-span-3">
          <label
            htmlFor="deadline_days"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Дедлайн (в днях)
          </label>
          <div className="mt-2 relative">
            <select
              id="deadline_days"
              {...register("deadline_days", {
                required: "Выберите количество дней",
              })}
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {errors.deadline_days && (
              <p className="mt-1 text-xs text-red-500 absolute top-9 left-0">
                {errors.deadline_days.message}
              </p>
            )}
          </div>
        </div>

        {/* Qty Freelancers */}
        <div className="sm:col-span-3">
          <label
            htmlFor="qty_freelancers"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Количество исполнителей
          </label>
          <div className="mt-2 relative">
            <input
              id="qty_freelancers"
              {...register("qty_freelancers", {
                required: "Поле обязательно",
                validate: (value) =>
                  value === "1" ||
                  "Количество исполнителей должно быть равно 1",
              })}
              type="number"
              defaultValue="1"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              readOnly
            />
          </div>
          {errors.qty_freelancers && (
            <p className="mt-1 text-xs text-red-500 absolute top-9 left-0">
              {errors.qty_freelancers.message}
            </p>
          )}
        </div>

        {/* Number of reminders */}
        <div className="sm:col-span-3">
          <label
            htmlFor="number_of_reminders"
            className="block text-sm font-medium text-gray-900"
          >
            Количество напоминаний
          </label>
          <div className="mt-2 relative">
            <select
              id="number_of_reminders"
              {...register("number_of_reminders", {
                required: "Выберите количество напоминаний",
              })}
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            >
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            {errors.number_of_reminders && (
              <p className="mt-1 text-xs text-red-500 absolute top-9 left-0">
                {errors.number_of_reminders.message}
              </p>
            )}
          </div>
        </div>

        {/* Private Content */}
        <div className="sm:col-span-6">
          <label
            htmlFor="rivate_content"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Приватный контент
          </label>
          <div className="mt-2 relative">
            <textarea
              id="rivate_content"
              rows="1"
              {...register("rivate_content")}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.rivate_content && (
              <p className="text-red-500 text-xs mt-1 absolute top-9 left-0">
                {errors.rivate_content.message}
              </p>
            )}
          </div>
        </div>

        {/* Is Hard */}
        <div className="sm:col-span-3 flex items-center">
          <input
            id="is_hard"
            type="checkbox"
            {...register("is_hard")}
            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label
            htmlFor="is_hard"
            className="ml-2 block text-sm font-medium text-gray-900"
          >
            Сложная задача
          </label>
        </div>

        {/* All Auto Responses */}
        <div className="sm:col-span-3 flex items-center">
          <input
            id="all_auto_responses"
            type="checkbox"
            {...register("all_auto_responses")}
            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label
            htmlFor="all_auto_responses"
            className="ml-2 block text-sm font-medium text-gray-900"
          >
            Разрешить автоматические ответы
          </label>
        </div>

        {/* Submit */}
        <div className="sm:col-span-6">
          <button
            type="submit"
            className="w-full tracking-wider rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Публикую..." : "Опубликовать задачу"}
          </button>
        </div>
      </div>
    </form>
  );
}
