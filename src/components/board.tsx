"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
  resetServerContext,
} from "react-beautiful-dnd";
import initialData from "./initial-data";

const Board = () => {
  // react-beautiful-dnd: The resetServerContext function should be used when server side rendering (SSR).
  // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/reset-server-context.md
  resetServerContext()

  const [state, setState] = useState(initialData);

  const moveColumn: OnDragEndResponder = (result) => {
    setState(state => {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(result.source.index, 1);
      newColumnOrder.splice(result.destination!.index, 0, result.draggableId);

      return {
        ...state,
        columnOrder: newColumnOrder,
      };
    })
  }

  const moveTask: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Remove item from source
    setState(state => {
      const sourceCol = state.columns[source.droppableId as keyof typeof state.columns];
      const sourceTaskIds = Array.from(sourceCol.taskIds);
      sourceTaskIds.splice(source.index, 1);

      return {
        ...state,
        columns: {
          ...state.columns,
          [sourceCol.id]: {
            ...sourceCol,
            taskIds: sourceTaskIds,
          },
        }
      }
    })

    // Add item to destination
    setState(state => {
      const destinationCol = state.columns[destination.droppableId as keyof typeof state.columns];
      const destinationTaskIds = Array.from(destinationCol.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);

      return {
        ...state,
        columns: {
          ...state.columns,
          [destinationCol.id]: {
            ...destinationCol,
            taskIds: destinationTaskIds,
          },
        }
      }
    })
  }

  const onDragEnd: OnDragEndResponder = (result, provided) => {
    switch (result.type) {
      case "COLUMN":
        moveColumn(result, provided)
        break
      case "TASK":
        moveTask(result, provided)
        break
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>

        <Droppable droppableId="board" type="COLUMN">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId as keyof typeof state.columns];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId as keyof typeof state.tasks]
                );

                return (
                  <Draggable key={column.id} draggableId={column.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <h3>{column.title}</h3>

                        <Droppable droppableId={column.id} type="TASK">
                          {(provided) => {
                            return (
                              <div ref={provided.innerRef} {...provided.droppableProps} style={{border: "1px solid black", margin: 8, minHeight: 20 }}>
                                {tasks.map((task, index) => {

                                  return (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                      {(provided) => (
                                        <div
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          ref={provided.innerRef}
                                        >
                                          {task.content}
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default Board;
