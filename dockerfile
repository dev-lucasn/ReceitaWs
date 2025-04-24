FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["ReceitaWs.API/ReceitaWs.API.csproj", "ReceitaWs.API/"]
COPY ["ReceitaWs.Application/ReceitaWs.Application.csproj", "ReceitaWs.Application/"]
COPY ["ReceitaWs.Core/ReceitaWs.Core.csproj", "ReceitaWs.Core/"]
COPY ["ReceitaWs.Infrastructure/ReceitaWs.Infrastructure.csproj", "ReceitaWs.Infrastructure/"]

RUN dotnet restore "ReceitaWs.API/ReceitaWs.API.csproj"

COPY . .

RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

WORKDIR /src/ReceitaWs.API
RUN dotnet ef database update --project ../ReceitaWs.Infrastructure --startup-project .

RUN dotnet publish "ReceitaWs.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
COPY --from=build /src/ReceitaWs.API/ReceitaWs.db .

EXPOSE 5000
ENTRYPOINT ["dotnet", "ReceitaWs.API.dll"]