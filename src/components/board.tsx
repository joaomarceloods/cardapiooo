"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import initialData from "./initial-data";

function Board() {
  const [state, setState] = useState(initialData);

  const onDragEnd: OnDragEndResponder = (result) => {
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId as keyof typeof state.columns];
          const tasks = column.taskIds.map(
            (taskId) => state.tasks[taskId as keyof typeof state.tasks]
          );

          return (
            <div key={column.id}>
              <h3>{column.title}</h3>

              <Droppable droppableId={column.id}>
                {(provided) => {

                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {tasks.map((task, index) => {
                        const { id, content } = task;

                        return (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(provided) => (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {content}
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
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default Board;
