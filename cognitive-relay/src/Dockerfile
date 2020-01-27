FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY "CognitiveRelay.csproj" .
RUN dotnet restore "CognitiveRelay.csproj"
COPY . .
RUN dotnet build "CognitiveRelay.csproj" -c Debug -o /app/build

FROM build AS publish
RUN dotnet publish "CognitiveRelay.csproj" -c Debug -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CognitiveRelay.dll"]
